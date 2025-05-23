import { useRef } from "react"
import { useListsStoreBase } from "../useListsStore";
import useVisitsStore from "../useVisitStore";
import { useAuthContextSupabase } from "../../context/AuthContextSupabase";

const useInitializeUserData = () => {
    const addList = useListsStoreBase((state) => state.addList);
    const lists = useListsStoreBase((state) => state.lists);
    const addVisit = useVisitsStore((state) => state.addVIsit);
    const { user } = useAuthContextSupabase();
    const hasInitialized = useRef(false);
    const list = {
        //user_id: user?.id,
        title: "testTitle",
        description: "testDescription",
        emoji: "🌍",
        //regions: []
    }
    const addListsAndVisits = async () => {
        if (hasInitialized.current) return;
        hasInitialized.current = true;

        if(lists.length === 0) {
            console.log("adding")
            await addList(list);
        }
    }
    return { addListsAndVisits };
}

export default useInitializeUserData