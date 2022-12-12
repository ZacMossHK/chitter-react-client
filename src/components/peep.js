import { useState } from "react";

const Peep = ({ peep, setPeeps }) => {
  const [heart, setHeart] = useState("♡");

  const handleLikeClick = async () => {
    const response = await fetch("");
    if (response.status === 201) {
      await setHeart("♥");
      await setPeeps([
        {
          _id: 1,
          username: "foo",
          body: "second peep",
          createdAt: new Date(2022, 10, 11).toISOString(),
          likes: [1],
        },
      ]);
    }
  };
  return (
    <div key={peep._id}>
      <p>@{peep.username}</p>
      <p>{peep.body}</p>
      <p>Posted at {new Date(peep.createdAt).toString()}</p>
      <p
        data-testid={`peeps-likes-${peep._id}`}
        id={`peeps-likes-${peep._id}`}
        onClick={handleLikeClick}
      >
        {heart} {peep.likes.length}
      </p>
    </div>
  );
};

export default Peep;
