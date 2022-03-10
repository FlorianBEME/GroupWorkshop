import { useState, useEffect } from "react";
import axios from "axios";
import { FETCH } from "../../FETCH";

import List from "./list/List";
import FormAdd from "./FormAdd";

function Main() {
  const [users, setUsers] = useState([]);
  const [dataIsLoad, setDataIsLoad] = useState(false);
  const [fetchInError, setFetchInError] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${FETCH}/wilder/read`)
        .then((res) => {
          res.data.success ? setDataIsLoad(true) : setDataIsLoad(false);
          setUsers(res.data.result);
        })
        .catch((err) => {
          console.error(err);
          setFetchInError(true);
        });
    };
    fetchData();
  }, []);

  const submitData = (e, formData) => {
    e.preventDefault();
    if (formData.skills.length === 0) {
      return console.log("error");
    }

    axios
      .post(`${FETCH}/wilder/create`, formData)
      .then((res) => {
        setUsers([...users, { ...res.data.result }]);
        for (const [key] of Object.entries(e.target)) {
          if (e.target[key].hasOwnProperty("value")) e.target[key].value = "";
          if (e.target[key].hasOwnProperty("checked"))
            e.target[key].checked = false;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteUser = (user) => {
    axios
      .delete(`${FETCH}/wilder/delete/${user._id}`)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          const newData = users.filter((el) => el._id !== user._id);
          setUsers([...newData]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addVote = (skill, user) => {
    axios
      .put(`${FETCH}/wilder/update/${user._id}/skills/${skill._id}`, {
        newCount: skill.votes + 1,
      })
      .then((res) => {
        const newList = [...users];

        const indexUsers = newList.findIndex((el) => el._id === user._id);
        const indexSkill = newList[indexUsers].skills.findIndex(
          (el) => el._id === skill._id
        );
        newList[indexUsers].skills[indexSkill].votes = skill.votes + 1;
        setUsers([...newList]);
      })
      .catch((err) => console.error(err));
  };

  return (
    <main>
      <List
        dataIsLoad={dataIsLoad}
        fetchInError={fetchInError}
        users={users}
        deleteWilder={deleteUser}
        addVote={addVote}
      />
      <FormAdd submitData={submitData} />
    </main>
  );
}

export default Main;
