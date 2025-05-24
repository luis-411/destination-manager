import { useRef } from "react"
import { useListsStoreBase } from "../useListsStore";
import useVisitsStore from "../useVisitStore";
//import { useAuthContextSupabase } from "../../context/AuthContextSupabase";
import { regions } from "../../data/regions";

const useInitializeUserData = () => {
    const addList = useListsStoreBase((state) => state.addList);
    const fetchLists = useListsStoreBase((state) => state.fetchLists);
    const lists = useListsStoreBase((state) => state.lists);
    const addVisit = useVisitsStore((state) => state.addVisit);
    const fetchVisits = useVisitsStore((state) => state.fetchVisits);
    const visits = useVisitsStore((state) => state.visits);
    //const { user } = useAuthContextSupabase();
    const hasInitialized = useRef(false);
    
    const addListsAndVisits = async (user) => {
        if (!user?.id) {
            console.error("User ID is missing!");
            return;
        }
        const list1 = {
            user_id: user?.id,
            title: "Summer Vacation 2025",
            description: "Visiting south europe in the summer with my friends.",
            emoji: "⛱️",
            regions: [regions[0], regions[1], regions[2]]
        }
        const list2 = {
            user_id: user?.id,
            title: "Scandinavia",
            description: "Roadtrip through Scandinavia with a visit at the North Cape.",
            emoji: "❄️",
            regions: [regions[3], regions[4], regions[5]]
        }
        const list3 = {
            user_id: user?.id,
            title: "Africa",
            description: "Going on safari in the south of africa.",
            emoji: "🦁",
            regions: [regions[6], regions[7], regions[8], regions[9]]
        }
        const visit1 = {
            user_id: user?.id,
            title: "Germany Business trip",
            description: "Working in Germany.",
            region_id: "167",
            region_name: "Germany",
            arrive: "2025-05-04",
            depart: "2025-05-05"
        }
        const visit2 = {
            user_id: user?.id,
            title: "Italy Visit",
            region_id: "188",
            region_name: "Italy and Malta",
            arrive: "2025-04-15",
            depart: "2025-04-22"
        }
        const visit3 = {
            user_id: user?.id,
            title: "Portugal Vacation",
            region_id: "194",
            region_name: "Portugal, mainland",
            arrive: "2025-02-10",
            depart: "2025-02-20"
        }
        const visit4 = {
            user_id: user?.id,
            title: "Turkey",
            region_id: "196",
            region_name: "Turkey",
            arrive: "2024-08-18",
            depart: "2024-08-25"
        }

        if (hasInitialized.current) return;
        hasInitialized.current = true;
        console.log(lists)
        console.log(visits)
        console.log("u1")
        console.log(user)
        if(lists.length === 0 ) await addList([list1, list2, list3]);
        if(visits.length === 0 ) await addVisit([visit1, visit2, visit3, visit4]);
        if(lists.length === 0 ) await fetchLists(user)
        if(visits.length === 0 ) await fetchVisits();
        console.log("u2")
        console.log(lists)
        console.log(visits)
    }
    return { addListsAndVisits };
}

export default useInitializeUserData