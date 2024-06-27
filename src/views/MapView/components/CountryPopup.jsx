import React, { useCallback, useEffect, useState } from "react";
import "../../../styles/App.css";
import { DetailScores } from "./DetailScores";
import { Col, Row } from "react-bootstrap";
import FavouriteTag from "../../../components/FavouriteTag";
import {
  CompassOutlined,
  PlusCircleOutlined,
  LikeOutlined,
  FolderOutlined
} from "@ant-design/icons";
import { useAuthContext } from "../../../context/AuthContext";
import { useAppModal } from "../../../components/AppModal";
import HandleVisit from "../../../components/Modals/HandleVisit";
import useLoadHistory from "../../../api/history/useLoadHistory";
import useLoadMeWithGroups from "../../../api/useLoadMeWithGroups";
import { convertShortMonthToLong } from "../../../helpers/months";
import AddGroups from "../../../components/Modals/AddGroup";

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


export const CountryPopup = ({ country }) => {
  const [selectedGroups, setSelectedGroups] = useState();
  const iconStyle = { fontSize: '12px' };
  const { user } = useAuthContext();
  const { data: groups, fetch: fetchGroups } = useLoadMeWithGroups();
  const modal = useAppModal();
  const { data: historyData, getDataForTheRegion: getHistoryDataForRegion } = useLoadHistory({
    userId: user?.id,
    regionId: country.country.id,
  });

  const onCreateNewRegionVisit = useCallback(() => {
    modal.setIsOpen(true);
    modal.setComponent(<HandleVisit country={country} />);
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
    return country.peakSeasons.map(month => convertShortMonthToLong(month)).join(separator);
  };

  const characteristics = [
    { name: 'Visitor Number', value: getTotalVisitorNumber(country), show: true },
    { name: 'Budget Level', value: budgetLabel, show: true },
    { name: 'Recommended', value: <LikeOutlined style={iconStyle} />, show: false },
  ];

  const regionStatistics = [
    { label: 'Peak seasons',  text: showBestSeasons(country), show: true  },
    { label: 'Score', text: `${country.scores.totalScore}/100`, show: true },
    { label: 'Your visits', text: historyData?.meta?.pagination?.total ?? 0, show: !!user?.id },
  ];
  const countColumnSpace = Math.floor(12 / regionStatistics.filter(stats => stats.show).length);

  useEffect(() => {
    if (user?.id) {
      getHistoryDataForRegion(country.id);
    }
  }, [country]);

  useEffect(() => {
    if(!modal.isOpen && user?.id) {
      console.log(user.id);
      debugger;
      fetchGroups();
    }
  }, [modal,country]);

  useEffect(() => {
    groups && setSelectedGroups(groups.groups?.filter((group) => group.regions
        .some((country1) => country.id === country1.id)
      ))
  }, [groups]);

  return (
    <div style={{ color: "white" }}>
      <Col className={'d-flex justify-content-between align-items-center'}>
        <p className={'m-0'} style={{ fontSize: '10px', paddingLeft: '1.2rem' }}>{country.country}</p>
        {user?.id && (
          <button onClick={onCreateNewRegionVisit} className='btn btn-secondary py-0 px-0' style={{fontSize: '10px'}}>
            <span>Add new visit</span>
            <CompassOutlined className={'ms-2'}/>
          </button>
        )}
      </Col>
      <h6 className={'d-flex fw-bold gap-2'} style={{fontSize: '12px'}}>
        <FavouriteTag country={country.uname}/>
        {country.region}
      </h6>
      <Row className='mt-3 mb-1'>
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
      <div className='d-flex justify-content-between align-items-center gap-2 mb-1'>
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

      {user?.id && (
        <>
          <Col style={{ fontSize: '10px' }} className='d-flex justify-content-between align-items-center'>
            <h6 style={{ fontSize: '10px' }}>Belongs to travel collections</h6>
            <button
              onClick={onAddGroups}
              className={'btn btn-secondary py-0 px-0'}
              style={{ fontSize: '10px' }}>
              Add collections
              <PlusCircleOutlined className={'ms-2'}/>
            </button>
          </Col>
          <Col className={`mobile-scroll d-flex gap-2 ${selectedGroups?.length === 0 ? 'justify-content-center' : 'justify-content-start' }`}>
            {groups && selectedGroups?.map((group, idx) => (
              <PopupGroup name={group.name} key={idx} />
            ))}
            {selectedGroups?.length === 0 && <h6 className='m-0' style={{ fontSize: '0.75rem' }}>Not found in any travel collections</h6>}
          </Col>
        </>
      )}
      <DetailScores
        scores={Object.keys(country.qualifications)?.map((key) => ({
          name: key,
          value: country.qualifications[key],
        }))}
        peakSeasons={country.peakSeasons}
        travelMonths={country.travelMonths}
        visitorIndexes={country.visitorIndex}
      />
    </div>
  );
};
