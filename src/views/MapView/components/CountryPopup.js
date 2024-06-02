import React, {useState} from "react";
import "../../../App.css";
import { DetailScores } from "./DetailScores";
import { Col } from "react-bootstrap";
import FavouriteTag from "../../../components/FavouriteTag";
import {FolderAddFilled, FolderAddOutlined, FieldTimeOutlined, LikeOutlined} from "@ant-design/icons";
import {useAuthContext} from "../../../context/AuthContext";


const PopupGroup = ({ name }) => {
  return (
    <div
      style={{ borderColor: '#FFF' }}
      className='d-flex justify-content-between align-items-center
      gap-2 border border-2 px-3 py-1 rounded-5'
    >
      <FolderAddFilled />
      <h6 className='m-0' style={{ fontSize: '10px' }}>{ name }</h6>
    </div>
  )
}

export const CountryPopup = ({ country }) => {
  const groups = ['Lala Land', 'Lumpapo'];
  const iconStyle = { fontSize: '18px'};
  const { user } = useAuthContext();

  const [helperButtons] = useState([
    { name: 'Add to Group', icon: <FolderAddOutlined style={iconStyle} />, onClick: () => console.log('Add to group') },
    { name: 'Not visited', icon: <FieldTimeOutlined style={iconStyle} />, onClick: () => console.log('change to visited') },
    { name: 'Recommended', icon: <LikeOutlined style={iconStyle} />, onClick: () => console.log('change to visited') },
  ]);

  const IconButton = ({ item }) => (
    <div className={'d-flex flex-column gap-1'}>
      <div className='d-flex justify-content-center'>{item.icon}</div>
      <h6 className='m-0' style={{fontSize: '10px'}}>{item.name}</h6>
    </div>
  )

  return (
    <div style={{color: "white"}}>
      <p className={'m-0'} style={{fontSize: '10px', paddingLeft: '1.2rem'}}>{country.country}</p>
      <h6 className={'d-flex fw-bold gap-2'} style={{fontSize: '12px'}}>
        <FavouriteTag country={country.uname}/>
        {country.region}
        <Col style={{textAlign: "end"}}>
          {country.scores.totalScore}/100
        </Col>
      </h6>
      <Col style={{ fontSize: '10px' }}>
        Best season in the region
      </Col>
      <Col className='text-center fw-bold'>
        Summer time
      </Col>
      { user && (
         <>
           <Col style={{ fontSize: '10px' }} className='mb-1'>
             In groups
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
          budgetLevel={country.budgetLevel}
        />
      </div>
      { user && (
        <Col className='d-flex justify-content-evenly'>
          { helperButtons.map((item, idx) => (
            <IconButton key={idx} item={item} />
          ))}
        </Col>
      )}
    </div>
  );
};
