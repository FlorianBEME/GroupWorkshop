import CardWilder from "../cardwilder/CardWilder";
import Loader from "../../common/Loader";

function List({ dataIsLoad, users, fetchInError, deleteWilder, addVote }) {
  return (
    <section className="list">
      <div className="list-container">
        <h2>Wilders</h2>
        <div className="grid grid-cols-3 gap-2 ">
          {dataIsLoad ? (
            users.length > 0 ? (
              users.map((user, index) => {
                return (
                  <div key={index}>
                    <CardWilder
                      addVote={(skill, user) => addVote(skill, user)}
                      user={user}
                      deleteUser={() => deleteWilder(user)}
                    />
                  </div>
                );
              })
            ) : (
              <div className="text-gray-200">Aucun wilder trouvé</div>
            )
          ) : fetchInError ? (
            <div>Une erreur est survenue</div>
          ) : (
            <>
              <Loader />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default List;
