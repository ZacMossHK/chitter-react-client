import { useState } from "react";

const Peep = ({ peep }) => {
  const [heart, setHeart] = useState("♡");
  const [peepLikes, setPeepLikes] = useState(peep.likes.length);

  const handleLikeClick = async () => {
    const response = await fetch("");
    if (response.status === 201) {
      await setHeart("♥");
      await setPeepLikes(peep.likes.length + 1);
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
        {heart} {peepLikes}
      </p>
    </div>
  );
};

export default Peep;
