import character_li from "./character_li.module.css";

interface CharacterLiProps {
  champion: {
    name: string;
    tags: string;
    image: string;
    key: string;
    id: string;
  };
  isSelected: boolean;
}

export default function CharacterLi({ champion, isSelected }: CharacterLiProps) {
  console.log(isSelected);
  // console.log(data.champion.id);
  // console.log(`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${data.champion.id}_0.jpg`);
  return (
    <>
      <li className={character_li.li}>
        {/* <div> */}
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`}
          alt={champion.name}
          style={{ width: "100px" }}
          className={`${isSelected ? character_li.selectedChampionImg : character_li.championImg}`}
        />
        {champion.name}
        {/* <div className={character_li.shape}></div> */}
        {/* <div>{data.champion.name}</div> */}
        {/* <p>{data.champion.tags}</p> */}
      </li>
    </>
  );
}
