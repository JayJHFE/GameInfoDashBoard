interface AramChampionTierProps {
    aramChamps: { name: string; tier: string }[];
  }
export default function AramChampionTier ({aramChamps}: AramChampionTierProps ) {
    console.log(aramChamps);
    return <>
                <div>
                    오찌도찌
                </div>
           </>
}