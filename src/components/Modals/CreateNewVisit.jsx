import {useMap} from "usehooks-ts";
import React from "react";
import {Form} from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import usePostHistory from "../../api/history/usePostHistory";
import {useAppModal} from "../AppModal";

export const CreateNewVisit = ({ country }) => {
  const { createNewVisit }  = usePostHistory();
  const { reset } = useAppModal();

  const [visit, visitActions] = useMap([
    ['title', ''],
    ['review', 1],
    ['description', ''],
    ['photos', []],
    ['region', country],
    ['arrived', new Date()],
    ['departed', new Date()],
  ]);

  const [visitForm] = useMap([
    ['title',
      {
        label: 'Title',
        placeholder: 'Put a title to your country visit',
        id: 'title',
        onChange: (e) => {
          visitActions.set('title', e.target.value)
        }
      }
    ],
    ['review',
      {
        label: 'Review',
        placeholder: 'Put a review for your trip',
        id: 'review',
        onChange: (e) => {
          if (+e.target.value < 1 || +e.target.value > 5) {
            return;
          }
          visitActions.set('review', +e.target.value)
        }
      }
    ],
    [
      'description',
      {
        label: 'Description',
        placeholder: 'Put some details from your trip',
        id: 'description',
        onChange: (e) => {
          visitActions.set('description', e.target.value)
        }
      }
    ],
    [
      'photos',
      {
        label: 'Photos',
        placeholder: 'Add photos',
        id: 'photos',
        onChange: (e) => {
          if (e.target.files === 0) {
            return;
          }
          visitActions.set('photos', [...e.target.files]);
        }
      }
    ],
    [
      'arrived',
      {
        label: 'Arrived',
        onChange: (date) => visitActions.set('arrived', date),
      }
    ],
    [
      'departed',
      {
        label: 'Departed',
        onChange: (date) => visitActions.set('departed', date),
      }
    ]
  ]);

  const onSave = () => {
    createNewVisit(visit, ['photos']);
    reset();
  }

  return (
    <div className={'px-4'}>
      <h4 className={'fa-sm ms-2 mb-4 fw-bold'}>Create new visit to {country.region}</h4>
      <div className={'d-flex flex-column gap-2'}>
        <div className="d-flex gap-2 justify-content-between">
          <div style={{flexBasis: '48%'}}>
            <Form.Label htmlFor="title">{visitForm.get('title').label}</Form.Label>
            <Form.Control
              value={visit.get('title').value}
              id={visitForm.get('title').id}
              placeholder={visitForm.get('title').label}
              aria-label={'Trip to'}
              onChange={visitForm.get('title').onChange}
            />
          </div>
          <div style={{flexBasis: '48%'}}>
            <Form.Label htmlFor="review">{visitForm.get('review').label}</Form.Label>
            <Form.Control
              value={visit.get('review')}
              id={visitForm.get('review').id}
              type={'number'}
              maxLength={1}
              max={5}
              min={1}
              placeholder={visitForm.get('review').label}
              aria-label={visitForm.get('review').label}
              onChange={visitForm.get('review').onChange}
            />
          </div>
        </div>
        <div>
          <Form.Label htmlFor="description">{visitForm.get('description').label}</Form.Label>
          <Form.Control
            value={visit.get('description')}
            id={visitForm.get('description').id}
            as="textarea"
            placeholder={visitForm.get('description').placeholder}
            onChange={visitForm.get('description').onChange}
          />
        </div>
        <div>
          <Form.Label htmlFor="photos">{visitForm.get('photos').label}</Form.Label>
          <Form.Control
            id={visitForm.get('photos').id}
            type="file"
            multiple
            onChange={visitForm.get('photos').onChange}
            accept={"image/*"}
          />
        </div>
        <div className={'d-flex flex-column'}>
          <Form.Label htmlFor="arrived">{visitForm.get('arrived').label}</Form.Label>
          <DatePicker
            selected={visit.get('arrived')}
            onChange={visitForm.get('arrived').onChange}
          />
        </div>
        <div className={'d-flex flex-column'}>
          <Form.Label htmlFor="departed">{visitForm.get('departed').label}</Form.Label>
          <DatePicker
            selected={visit.get('departed')}
            onChange={visitForm.get('departed').onChange}
          />
        </div>
      </div>
      <div className='d-flex justify-content-end align-items-center mt-3'>
        <button
          className='me-3 btn'
          style={{fontSize: '12px', color: 'white', whiteSpace: 'nowrap'}}
          onClick={reset}
        >
          Cancel
        </button>
        <button className='btn btn-primary' onClick={onSave}>Save</button>
      </div>
    </div>
  )
};

export default CreateNewVisit;