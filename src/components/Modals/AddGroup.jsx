import useLoadMeWithGroups from "../../api/useLoadMeWithGroups";
import useUpdateMeWithGroups from "../../api/useUpdateMeWithGroups";
import React, {useEffect, useState} from "react";
import {useAppModal} from "../AppModal";
import {CheckOutlined} from "@ant-design/icons";
import {message} from "antd";

export const AddGroups = ({ country }) => {
  const { data, loading } = useLoadMeWithGroups();
  const { executePutGroups } = useUpdateMeWithGroups();
  const [dataWithProperties, setDataWithProperties] = useState();
  const modal = useAppModal();

  useEffect(() => {
    !loading
    && setDataWithProperties(data.groups
      .map((group) => ({
        ...group,
        isSelected: group.regions
          .some((country1) => country1.id === country.id)
      })))
  }, [loading])
  return (
    <div>
      <h4 className={'fs-5 fw-bold'}>Add Groups</h4>
      {dataWithProperties && !loading && <div>
        <div style={{ marginTop: "2rem", display: "grid", gap: "1rem", gridTemplateColumns: "0.25fr 0.25fr 0.25fr 0.25fr" }}>
          {dataWithProperties.map((group, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setDataWithProperties(
                    dataWithProperties.map(
                      (group1) => group1.id !== group.id ? group1 :
                        { ...group, isSelected: !group.isSelected }
                    )
                  )
                }}
                style={{ cursor: "pointer", border: group.isSelected ? "1px solid #FFFFFF" : "1px solid #336273", display: "grid", width: "162px", height: "32px", backgroundImage: "linear-gradient(to right,#0B1C22 0%,#1B404D 100%)", borderRadius: "18px" }}>
                <div style={{ paddingLeft: "1rem", paddingRight: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "10px", fontWeight: "Bold" }}>
                    {group.name}
                  </span>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "1.3rem", border: group.isSelected ? "1px solid #FFFFFF" : "1px solid transparent", width: "1.3rem", backgroundColor: "#336273", borderRadius: "50%" }}>
                    <CheckOutlined style={{ display: group.isSelected ? "block" : "none", fontSize: "10px" }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      }
      <div style={{ marginTop: "2rem", justifyContent: "flex-end", display: "flex" }}>
        <span style={{ marginRight: "1rem", alignContent: "center", cursor: "pointer" }}
              onClick={() => {
                modal.reset()
              }}
        >
          Cancel
        </span>
        <div
          onClick={() => {
            setDataWithProperties(dataWithProperties
              .map((group) => ({
                name: group.name,
                regions: group.isSelected
                  ?
                  [{ id: country.id }, ...group.regions.map((country1) => ({ id: country1.id }))]
                  :
                  [...group.regions.map((country1) => ({ id: country1.id }))]
              })))

            executePutGroups(
              {
                data: {
                  "groups": dataWithProperties
                    .map((group) =>
                      ({
                        name: group.name,
                        regions: group.isSelected
                          ?
                          [{ id: country.id }, ...group.regions
                            .filter((filteredCountry) => filteredCountry.id !== country.id)
                            .map((country1) => ({ id: country1.id }))]
                          :
                          [...group.regions
                            .filter((filteredCountry) => filteredCountry.id !== country.id)
                            .map((country1) => ({ id: country1.id }))]
                      }))
                }
              }).then((e) => {
              message.success("Groups updated successfully");
              modal.reset()
            })
              .catch((error) => {
                message.error("Groups update failed")
              })
          }}
          style={{ cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", color: "black", height: "2.3rem", minWidth: "11.5rem", background: "white", borderRadius: "0.8rem", marginRight: "1rem" }}>
          Add groups
        </div>
      </div>
    </div>
  );
};

export default AddGroups;