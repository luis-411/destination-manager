import React, { useCallback, useEffect, useState } from "react";
import "../../../styles/App.css";
import { DetailScores } from "./DetailScores";
import { Col, Row } from "react-bootstrap";
import FavouriteTag from "../../../components/FavouriteTag";
import {
  CompassOutlined,
  PlusCircleOutlined,
  LikeOutlined,
  CheckOutlined,
  FolderOutlined
} from "@ant-design/icons";
import { useAuthContext } from "../../../context/AuthContext";
import { useAppModal } from "../../../components/AppModal";
import CreateNewVisit from "../../../components/Modals/CreateNewVisit";
import useLoadHistory from "../../../api/history/useLoadHistory";
import useLoadMeWithGroups from "../../../api/useLoadMeWithGroups";
import useUpdateMeWithGroups from "../../../api/useUpdateMeWithGroups";
import { message } from "antd";
import shortMonthToLongMonth from "../../../helpers/shortMonthToLongMonth";
const PopupGroup = ({ name }) => {
  return (
    <div
      className='d-flex justify-content-between align-items-center
      gap-2 border border-1 px-3 py-1 rounded-5 border-white'
    >
      <FolderOutlined />
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

}


export const CountryPopup = ({ country }) => {
  const { data, fetch } = useLoadMeWithGroups();
  const [selectedGroup, setSelectedGroup] = useState();
  const iconStyle = { fontSize: '12px' };
  const { user } = useAuthContext();
  const modal = useAppModal();
  const { data: historyData, getDataForTheRegion: getHistoryDataForRegion } = useLoadHistory({
    userId: user?.id,
    regionId: country.country.id,
  });

  useEffect(() => {
    getHistoryDataForRegion(country.id);
  }, [country]);

  const onCreateNewRegionVisit = useCallback(() => {
    modal.setIsOpen(true);
    modal.setComponent(<CreateNewVisit country={country} />);
  }, [country]);

  const onAddGroups = () => {
    modal.setIsOpen(true);
    modal.setWidthClassName('modal-70w');
    modal.setComponent(<AddGroups country={country} />);
  }

  const budgetLabel = country.budgetLevel < 40 ? "Low" : country.budgetLevel < 80 ? "Medium" : "High";

  const getTotalVisitorNumber = (country) => Object.values(country.visitorIndex)
    .reduce((acc, num) => acc + num, 0);

  const showBestSeasons = (country, separator = ', ') => {
    if (country.peakSeasons.length === 0) {
      return "None";
    }
    return country.peakSeasons.map(month => shortMonthToLongMonth(month)).join(separator);
  };

  const characteristics = [
    { name: 'Visitor Number', value: getTotalVisitorNumber(country), show: true },
    { name: 'Budget Level', value: budgetLabel, show: true },
    { name: 'Recommended', value: <LikeOutlined style={iconStyle} />, show: !!user?.id },
  ];

  const regionStatistics = [
    { label: 'Best seasons',  text: showBestSeasons(country), show: true  },
    { label: 'Score', text: `${country.scores.totalScore}/100`, show: true },
    { label: 'Your visits', text: historyData?.meta?.pagination.total ?? 0, show: !!user?.id },
  ];
  const countColumnSpace = Math.floor(12 / regionStatistics.filter(stats => stats.show).length);

  useEffect(() => {
    console.log(country)
    if(!modal.isOpen){
      fetch()
    }
  }, [modal,country]);

  useEffect(() => {
    data && setSelectedGroup(data.groups.filter(
      (group) => group.regions.some((country1) => country.id === country1.id)))
  }, [data]);

  return (
    <div style={{ color: "white" }}>
      <Col className={'d-flex justify-content-between align-items-center'}>
        <p className={'m-0'} style={{ fontSize: '10px', paddingLeft: '1.2rem' }}>{country.country}</p>
        <button onClick={onCreateNewRegionVisit} className='btn btn-secondary py-0 px-0' style={{ fontSize: '10px' }}>
          <span>Add new visit</span>
          <CompassOutlined className={'ms-2'}/>
        </button>
      </Col>
      <h6 className={'d-flex fw-bold gap-2'} style={{ fontSize: '12px' }}>
        <FavouriteTag country={country.uname} />
        {country.region}
      </h6>
      <Row className='mt-3'>
        {regionStatistics.map((statistic, idx) => statistic.show && (
          <Col key={idx} xs={countColumnSpace} className={`d-flex flex-column m-0 ${idx === 0 ? 'p-0' : 'pe-0 ps-4 py-0'}`}>
            <h6 className={'w-100 fa-xs'}>{statistic.label}</h6>
            <h5 className='text-truncate' style={{ fontSize: '0.875rem' }}>{statistic.text}</h5>
          </Col>
        ))}
      </Row>
      <Col style={{fontSize: '10px' }} className='mb-1'>
        Characteristics
      </Col>
      <div className='d-flex justify-content-between align-items-center gap-2'>
        {characteristics.map((characteristic, index) => characteristic.show && (
          <div key={index} className='text-center d-flex flex-column gap-2 flex-grow-1'>
            <div
              className='d-block px-1 m-0 rounded-2'
              style={{ border: '1px solid #336273', height: '1rem' }}
            >
              <p className='fa-sm m-0' style={{ lineHeight: '1rem' }}>{characteristic.value}</p>
            </div>
            <h6 style={{ fontSize: '10px' }}>{characteristic.name}</h6>
          </div>
        ))}
      </div>

      {user && (
        <>
          <Col style={{ fontSize: '10px' }} className='d-flex justify-content-between align-items-center'>
            <h6 style={{ fontSize: '10px' }}>In groups</h6>
            <button
              onClick={onAddGroups}
              className={'btn btn-secondary py-0 px-0'}
              style={{ fontSize: '10px' }}>
              Add groups
              <PlusCircleOutlined className={'ms-2'}/>
            </button>
          </Col>
          <Col className='mobile-scroll d-flex gap-2'>
            {data && selectedGroup?.map((group, idx) => (
              <PopupGroup name={group.name} key={idx} />
            ))}
            {selectedGroup?.length === 0 && <h6 className='m-0' style={{ fontSize: '0.75rem' }}>No groups</h6>}
          </Col>
        </>
      )}
      <DetailScores
        scores={Object.keys(country.qualifications)?.map((key) => ({
          name: key,
          value: country.qualifications[key],
        }))}
        travelMonths={country.travelMonths}
        visitorIndexes={Object.values(country.visitorIndex)}
      />
    </div>
  );
};
