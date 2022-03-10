import React from "react";
import userPlaceholder from "../../../assets/Portrait_Placeholder.png";
import Proptypes from "prop-types";

CardWilder.propTypes = {
  user: Proptypes.object.isRequired,
  deleteUser: Proptypes.func.isRequired,
  addVote: Proptypes.func.isRequired,
};

function CardWilder({ user, deleteUser, addVote }) {
  return (
    <div className="border-2 rounded-lg shadow-lg p-4 relative min-h-full">
      <span
        onClick={() => deleteUser()}
        className="cursor-pointer absolute -top-2.5 -right-1 bg-red-400 text-white rounded-full px-1.5"
      >
        X
      </span>
      {user.img ? (
        <img src={user.img} alt={user.name} />
      ) : (
        <img src={userPlaceholder} alt={user.name} />
      )}

      <div className="flex flex-col items-start">
        <h4 className="text-red-400 capitalize my-2 font-semibold text-lg">
          {user.name}
        </h4>
        <p className="text-left text-gray-600">{user.description}</p>
        <h5 className="text-red-400 capitalize my-2 font-semibold text-lg mt-4">
          Wild Skills
        </h5>
        <div className="flex flex-wrap justify-center">
          {user.skills.map((skill, index) => {
            return (
              <div
                onClick={() => addVote(skill, user)}
                key={index}
                className="border p-2 border-gray-700  rounded-2xl uppercase m-2 relative"
              >
                <p className="text-gray-600 ">
                  {skill.title}
                  <span className="bg-red-400 text-sm px-1.5 rounded-full text-white absolute -top-2 -right-2">
                    {skill.votes}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CardWilder;
