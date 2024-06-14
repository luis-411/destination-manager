import React, { useCallback, useEffect, useState } from "react";
import "../../../styles/App.css";
import { DetailScores } from "./DetailScores";
import { Col, InputGroup, Form } from "react-bootstrap";
import FavouriteTag from "../../../components/FavouriteTag";
import { FolderAddFilled, FolderAddOutlined, FieldTimeOutlined, LikeOutlined, CheckOutlined } from "@ant-design/icons";
import { useAuthContext } from "../../../context/AuthContext";
import { useAppModal } from "../../../components/AppModal";
import CreateNewVisit from "../../../components/Modals/CreateNewVisit";
import useLoadHistory from "../../../api/history/useLoadHistory";
import useLoadMeWithGroups from "../../../api/useLoadMeWithGroups";
import useUpdateMeWithGroups from "../../../api/useUpdateMeWithGroups";
const PopupGroup = ({ name }) => {
  return (
    <div
      style={{ borderColor: '#FFF' }}
      className='d-flex justify-content-between align-items-center
      gap-2 border border-2 px-3 py-1 rounded-5'
    >
      <FolderAddFilled />
      <h6 className='m-0' style={{ fontSize: '10px' }}>{name}</h6>
    </div>
  )
}

export const AddGroups = ({ country }) => {
  const { data, loading, error } = useLoadMeWithGroups();
  const { data: dataPut, executePutGroups, loading: putLoading, error: putError } = useUpdateMeWithGroups();
  const [dataWithProperties, setDataWithProperties] = useState();
  const modal = useAppModal();
  useEffect(() => {

    !loading
      && setDataWithProperties(data.groups.map((group) => ({ ...group, isSelected: group.regions.some((country1) => country1.id === country.id) })))
  }, [loading])
  useEffect(() => {
    {
      dataWithProperties &&
        console.log(dataWithProperties);
    }

  }, [dataWithProperties])
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
                modal.reset()
              })
          }}
          style={{ cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", color: "black", height: "2.3rem", minWidth: "11.5rem", background: "white", borderRadius: "0.8rem", marginRight: "1rem" }}>
          Add groups
        </div>
      </div>
    </div>
  );

}


export const CountryPopup = ({ country }) => {
  const groups = ['Lala Land', 'Lumpapo'];
  const iconStyle = { fontSize: '12px' };
  const { user } = useAuthContext();
  const modal = useAppModal();
  const { data: historyData } = useLoadHistory({
    userId: user.id,
    regionId: country.country.id
  });

  const createNewRegionVisit = useCallback(() => {
    modal.setIsOpen(true);
    modal.setComponent(<CreateNewVisit country={country} />);
  }, [country]);

  const onAddGroups = () => {
    modal.setIsOpen(true);
    modal.setWidthClassName('modal-70w');
    modal.setComponent(<AddGroups country={country} />);
  }

  const budgetLabel = country.budgetLevel < 40 ? "Low" : country.budgetLevel < 80 ? "Medium" : "High";

  const characteristics = [
    { name: 'Score', value: `${country.scores.totalScore}/100`, show: true },
    { name: 'Visits', value: historyData?.meta?.pagination.total ?? 0, show: !!user?.id },
    { name: 'Budget Level', value: budgetLabel, show: true },
    { name: 'Recommended', value: <LikeOutlined style={iconStyle} />, show: !!user?.id },
  ];

  return (
    <div style={{ color: "white" }}>
      <p className={'m-0'} style={{ fontSize: '10px', paddingLeft: '1.2rem' }}>{country.country}</p>
      <h6 className={'d-flex fw-bold gap-2'} style={{ fontSize: '12px' }}>
        <FavouriteTag country={country.uname} />
        {country.region}
        <Col style={{ textAlign: "end" }}>
          {country.scores.totalScore}/100
        </Col>
      </h6>
      <Col style={{ fontSize: '10px' }}>
        Best season in the region
      </Col>
      <Col className='text-center fw-bold'>
        Summer time
      </Col>
      <Col style={{ fontSize: '10px' }} className='mb-1'>
        Characteristics
      </Col>
      <div className='d-flex justify-content-between align-items-center'>
        {characteristics.map((characteristic, index) => characteristic.show && (
          <div key={index} className='text-center d-flex flex-column gap-2'>
            <div
              className='d-block px-1 m-0 rounded-2'
              style={{ border: '1px solid #336273', width: '70px', height: '1rem' }}
            >
              <p className='fa-sm m-0' style={{ lineHeight: '1rem' }}>{characteristic.value}</p>
            </div>
            <h6 style={{ fontSize: '10px' }}>{characteristic.name}</h6>
          </div>
        ))}
      </div>

      {user && (
        <>
          <Col style={{ fontSize: '10px' }} className='mb-1 d-flex justify-content-between align-items-center'>
            <h6 style={{ fontSize: '10px' }}>In groups</h6>
            <button onClick={onAddGroups} className={'btn fw-bold text-white'} style={{ fontSize: '10px' }}>Add groups</button>
          </Col>
          <Col className='d-flex gap-2 mb-3'>
            {groups.map((group, idx) => (
              <PopupGroup name={group} key={idx} />
            ))}
          </Col>
        </>
      )}

      <div className='w-100 mb-2'>
        <DetailScores
          scores={Object.keys(country.qualifications)?.map((key) => ({
            name: key,
            value: country.qualifications[key],
          }))}
          travelMonths={country.travelMonths}
        />
      </div>
    </div>
  );
};
