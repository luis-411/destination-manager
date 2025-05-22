import { createClient } from "@supabase/supabase-js";
import { message } from "antd";
import { useState, useCallback } from "react";

const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_ANON_KEY
);

const useCountries = () => {
    const [countries, setCountries] = useState([]);
    const fetchCountries = useCallback(async () => {
        try {
            const { data, error } = await supabase
            .from("countries")
            .select("country_data")
            .limit(1)
            .single();
            if (error) {
                throw error;
            }
            setCountries(data?.country_data || []);
        }
        catch (error) {
            console.error(error);
        }
    }, []);
    return {fetchCountries, countries};
}

export default useCountries;