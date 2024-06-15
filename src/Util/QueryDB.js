const join = (Table, Id, foreign_Id, as_Name) => {
  return {
    $lookup: {
      as: as_Name,
      from: Table,
      localField: Id,
      foreignField: foreign_Id,
    },
  };
};

const project = (Object = {}, lookup = { temp: "" }) => {
  if (lookup.temp == "") {
    console.log("Name for lookup is emty");
    return { $project: {} };
  }
  return {
    $project: {
      ...Object,
      ...lookup,
    },
  };
};

const match = (Name, Value) => {
  let temp = {};
  temp[Name] = Value;
  return {
    $match: temp,
  };
};

module.exports = { join, match, project };
