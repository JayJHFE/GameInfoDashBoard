import character_li from "./character_li.module.css";

interface CharacterLiProps {
  key: string;

  champion: {
    name: string;

    tags: string;

    image: string;

    key: string;

    id: string;
  };
}

export default function CharacterLi(data: CharacterLiProps) {
  // console.log(data.champion.id);
  // console.log(`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${data.champion.id}_0.jpg`);
  return (
    <>
      <li className={character_li.li}>
        {/* <div> */}
        {/* <img
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${data.champion.id}_0.jpg`}
          alt={data.champion.name}
          style={{ width: "100px", height: "20vh" }}
        /> */}
        <h3 className={character_li.h3}>{data.champion.name}</h3>
        <p>{data.champion.tags}</p>
      </li>
    </>
  );
}
