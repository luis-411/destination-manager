import Select from "react-select";
import { useEffect, useState } from "react";
import LoadCountriesTask from "../tasks/LoadCountriesTask";

const RegionsSelect = ({regions, setRegions, isVisit}) => {
    //const [groupRegions, setGroupRegions] = useState([]);
    const [fileRetrieved, setFileRetrieved] = useState([]);
    //const [newGroupRegions, setNewGroupRegions] = useState([]);

    const load = () => {
        const loadCountriesTask = new LoadCountriesTask();
        loadCountriesTask.load(setFileRetrieved);
    };
    const [availableRegions, setAvailableRegions] = useState([]);
    useEffect(load, []);
    useEffect(() => {
        const regionsData = fileRetrieved
        .filter((region) => region.ParentRegion.data !== null && region.ParentRegion.data.attributes.Region !== "World")
        .sort((a, b) => a.Region.localeCompare(b.Region))
        .map((region) => ({
            value: region,
            label: region.Region,
        }));
        setAvailableRegions(regionsData);
    }, [fileRetrieved]);

    return (
        <div>
            <Select
                isMulti={isVisit ? false : true}
                isSearchable
                options={availableRegions}
                value={regions}
                onChange={(selected) => setRegions(selected)}
                placeholder={isVisit ? "Select region" : "Select regions"}
                styles={{
                    control: (base, state) => ({
                        ...base,
                        borderColor: "rgba(255, 255, 255, 0.7)",
                        fontSize: "0.8rem",
                        backgroundColor: "transparent",
                        overflowY: "auto", // Allow scrolling for selected options
                        cursor: "text",
                    }),
                    input: (base) => ({
                        ...base,
                        color: "white", // Text color for the input field
                    }),
                    menu: (base) => ({
                        ...base,
                        backgroundColor: "transparent", // Dropdown background color
                        color: "white",
                        //zIndex: 9999, // Ensure dropdown is above other elements
                    }),
                    option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? "rgba(27,64,77,1)" : "rgba(11,28,34,1)", // Highlight focused option
                        color: "white", // Text color
                        cursor: "pointer",
                    }),
                    multiValue: (base) => ({
                        ...base,
                        backgroundColor: "#333333", // Background for selected options
                        color: "white",
                    }),
                    multiValueLabel: (base) => ({
                        ...base,
                        color: "white", // Text color for selected options
                    }),
                    multiValueRemove: (base) => ({
                        ...base,
                        color: "white", // Remove button color
                        ":hover": {
                            backgroundColor: "red",
                            color: "white",
                        },
                    }),
                }}
                menuPlacement="auto" // Automatically adjust dropdown placement
                //menuPortalTarget={document.body} // Render dropdown in the body to avoid clipping
                menuShouldScrollIntoView={true} // Ensure dropdown scrolls into view
            />
        </div>
    )
};

export default RegionsSelect;