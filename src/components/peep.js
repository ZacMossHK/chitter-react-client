import { useState, useEffect } from "react";

const Peep = ({ peep, user }) => {
  const [heart, setHeart] = useState("♡");
  const [peepLikes, setPeepLikes] = useState(peep.likes.length);
  useEffect(() => {
    if (user && peep.likes.includes(user._id)) setHeart("♥");
  }, [user]);

  const handleLikeClick = async () => {
    const response = await fetch("");
    if (heart === "♥") {
      await setHeart("♡");
      await setPeepLikes(peepLikes - 1);
    } else if (response.status === 201) {
      await setHeart("♥");
      await setPeepLikes(peepLikes + 1);
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
