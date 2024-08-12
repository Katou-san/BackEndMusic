var fpcalca = require("fpcalc");
var bigInt = require("big-integer");
var bin = require("dec-to-binary");
const path = require("path");
const numpy = require("jsnumpy");
const { Fingerprints } = require("../Model/Audio_FP");
const { Song } = require("../Model/Song");
const { join, match } = require("../Util/QueryDB");

const defaultOptions = {
  // seconds to sample audio file for
  sample_time: 500,
  // number of points to scan cross correlation over
  span: 50,
  // step size(in points) of cross correlation
  step: 1,
  // minimum number of points that must overlap in cross correlation
  // exception is raised if this cannot be met
  min_overlap: 1,
  // report match when cross correlation has a peak exceeding threshold
  threshold: 0.2,
};

const SV__GetFP = (file) => {
  return new Promise(async (resolve, reject) => {
    try {
      const fpcalc = path.join(__dirname, "../Assets/fpcalc/fpcalc.exe");
      ///sau khi npm i thi vao tahy doi thu vien(bo 40 - 51)
      fpcalca(file, { command: fpcalc, raw: true }, async (err, result) => {
        if (err) throw err;

        return resolve(result.fingerprint);
      });
    } catch (error) {
      reject({ status: 404, message: error.message });
    }
  });
};

function correlation(listx, listy) {
  if (!(listx?.length > 0 && listy?.length > 0)) {
    //Error checking in main program should prevent us from ever being able to get here.
    throw Error("Empty lists cannot be correlated.");
  }

  if (listx.length > listy.length) {
    listx = listx.slice(0, listy.length);
  } else if (listx.length < listy.length) {
    listy = listy.slice(0, listx.length);
  }

  let covariance = 0;

  for (let i = 0; i < listx.length; i++) {
    let xor = parseFloat(bigInt(listx[i]).xor(listy[i]).value, 10);

    covariance += 32 - (bin.decimal(xor).split("1").length - 1);
  }

  covariance = covariance / parseFloat(listx.length, 10);

  return covariance / 32;
}

function cross_correlation(listx, listy, offset) {
  if (offset > 0) {
    listx = listx.slice(offset);
    listy = listy.slice(0, listx.length);
  } else if (offset < 0) {
    offset = -offset;
    listy = listy.slice(offset);
    listx = listx.slice(0, listy.length);
  }

  if (Math.min(listx.length, listy.length) < defaultOptions.min_overlap) {
    // Error checking in main program should prevent us from ever being able to get here.
    return;
    // throw Error('Overlap too small: %i' % min(len(listx), len(listy)))
  }

  return correlation(listx, listy);
}

function compareCorrelate(listx, listy, span, step) {
  const min = Math.min(listx.length, listy.length);
  if (defaultOptions.span > min) {
    return false;
  }

  const corr_xy = [];

  for (let offset of numpy.arange(-span, span, step)) {
    corr_xy.push(cross_correlation(listx, listy, offset));
  }
  //   console.log(corr_xy);

  return corr_xy;
}
function max_index(listx) {
  let max_index = 0;
  let max_value = listx[0];

  listx.map((value, i) => {
    if (value > max_value) {
      max_value = value;
      max_index = i;
    }
  });

  return max_index;
}

function get_max_corr(corr, source, target) {
  const max_corr_index = max_index(corr);
  const max_corr_offset =
    -defaultOptions.span + max_corr_index * defaultOptions.step;
  return {
    max_corr_index,
    max_corr_offset,
    match: corr[max_corr_index] * 100.0,
  };
}

const SV__CompareFP = async (fp1, fp2) => {
  try {
    const a_fp = await fp1.split(",").map(function (value) {
      return parseInt(value);
    });
    const b_fp = await fp2.split(",").map(function (value) {
      return parseInt(value);
    });

    const length = defaultOptions.span;
    var timeloop = 0;
    while (timeloop * length < a_fp.length) {
      var test_a_fp = [];
      for (var i = length * timeloop; i < length + length * timeloop; i++) {
        test_a_fp.push(a_fp[i]);
      }

      const corr = await compareCorrelate(
        test_a_fp,
        b_fp,
        defaultOptions.span,
        defaultOptions.step
      );
      if (corr == false) {
        return { err: "Not enought lenght" };
      }

      const check = await get_max_corr(corr, fp1, fp2);
      if (check.match > 85) {
        return check;
      } else {
        timeloop++;
      }
    }
    return { err: "Not match" };
  } catch (e) {}

  //   return get_max_corr(corr);
};

const SV__Create_Audio_FP = async (file, songID) => {
  try {
    const check = await Fingerprints.findOne({ Song_Id: songID });
    if (!check) {
      const fb = await SV__GetFP(file);

      const result = await Fingerprints.create({
        Song_Id: songID,
        FB_array: fb,
      });
      return {
        status: 200,
        message: "Song FP create successfully",
        data: result,
      };
    } else {
      return { status: 404, message: "Song FP exist" };
    }
  } catch (e) {
    return { status: 404, message: "Song FP create err" };
  }
};

const getValue = {
  Song_Id: 1,
  Song_Name: 1,
  Song_Image: 1,
  Song_Audio: 1,
  Artist: 1,
  User_Id: 1,
  Category_Id: 1,
  Lyrics: 1,
  Tag: 1,
  Color: 1,
  is_Publish: 1,
  Create_Date: 1,
  Artist_Name: 1,
};

const SV__find_Audio_FP = async (file) => {
  try {
    const list = await Fingerprints.aggregate([
      {
        $lookup: {
          from: "songs",
          localField: "Song_Id",
          foreignField: "Song_Id",
          as: "result",
        },
      },
      { $unwind: { path: "$result" } },
      {
        $project: {
          Song_Id: 1,
          FB_array: 1,
          public: "$result.is_Publish",
        },
      },
      { $match: { public: true } },
      { $set: { rand: { $rand: {} } } },
      { $sort: { rand: -1 } },
      { $project: { rand: 0 } },
    ]);
    const file_fp = await SV__GetFP(file);
    if (list) {
      for (const fp of list) {
        const result = await SV__CompareFP(fp.FB_array, file_fp);

        if (result.match > 85) {
          const song = await Song.aggregate([
            join("artists", "Artist", "Artist_Id", "artist_t"),
            {
              $project: {
                ...getValue,
                is_Admin: "$User.is_Admin",
                Artist_Name: {
                  $ifNull: [{ $first: "$artist_t.Artist_Name" }, "unknown"],
                },
              },
            },
            match("Song_Id", fp.Song_Id),
          ]);
          if (song.length > 0) {
            return { Song: song[0], result: result };
          }
        }
      }
      return false;
    } else {
      return { status: 404, message: "FP have no data" };
    }
  } catch (e) {
    return { status: 404, message: "Song FP find err" };
  }
};

module.exports = {
  SV__GetFP,
  SV__CompareFP,
  SV__Create_Audio_FP,
  SV__find_Audio_FP,
};
