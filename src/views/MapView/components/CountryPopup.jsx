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
import { useAppModal } from "../../../components/AppModal";
import HandleVisit from "../../../components/Modals/HandleVisit";
import useLoadMeWithGroups from "../../../api/useLoadMeWithGroups";
import { convertShortMonthToLong } from "../../../helpers/months";
import { useAuthContextSupabase } from "../../../context/AuthContextSupabase";
import RegionDataView from "./RegionDataView";
import useFeatures from "../../../api/useFeatures";
import useVisitsStore from "../../../api/useVisitStore";




export const CountryPopup = ({ country }) => {
  const [selectedGroups, setSelectedGroups] = useState();
  const iconStyle = { fontSize: '12px' };
  const { user } = useAuthContextSupabase();
  const { features } = useFeatures();
  const visits = useVisitsStore((state) => state.visits);
  const fetchVisits = useVisitsStore((state) => state.fetchVisits);
  
  const modal = useAppModal();
  const { data: groups, fetch: fetchGroups } = useLoadMeWithGroups();

  useEffect(() => {
    fetchVisits();
  }, [fetchVisits]);

  const onCreateNewRegionVisit = useCallback(() => {
    modal.setIsOpen(true);
    modal.setComponent(<HandleVisit country={country} />);
  }, [country]);

  const budgetLabel = country.budgetLevel < 40 ? "Low" : country.budgetLevel < 80 ? "Medium" : "High";

  const getTotalVisitorNumber = (country) => Object.values(country.visitorIndex)
    .reduce((acc, num) => acc + num, 0);

  const showBestSeasons = (country, separator = ', ') => {
    if (country.peakSeasons.length === 0) {
      return "None";
    }
    return country.peakSeasons.map(month => convertShortMonthToLong(month)).join(separator);
  };

  const visitCountForCountry = visits.filter(visit => parseInt(visit.region_id) === country.id).length;

  const characteristics = [
    { name: 'Visitor Number', value: getTotalVisitorNumber(country), show: false },
    { name: 'Budget Level', value: budgetLabel, show: true },
    { name: 'Recommended', value: <LikeOutlined style={iconStyle} />, show: false },
  ];

  const regionStatistics = [
    { label: 'Peak seasons',  text: showBestSeasons(country), show: true  },
    { label: 'Score', text: `${country.scores.totalScore}/100`, show: false },
    { label: 'Your visits', text: visitCountForCountry, show: !!user?.id },
  ];
  const countColumnSpace = Math.floor(12 / regionStatistics.filter(stats => stats.show).length);

  useEffect(() => {
    groups && setSelectedGroups(groups.groups?.filter((group) => group.regions
        .some((country1) => country.id === country1.id)
      ))
  }, [groups]);

  return (
    <div style={{ color: "white" }}>
      <Col className={'d-flex justify-content-between align-items-center'}>
        <p className={'m-0'} style={{ fontSize: '10px' }}>{country.country}</p>
        {user?.id && features.addVisit === "popup" && (
          <button onClick={onCreateNewRegionVisit} className='btn btn-secondary py-0 px-0' style={{fontSize: '12px'}}>
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

      {user && (
        <RegionDataView regionId={country.id} regionName={country.region} />
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
