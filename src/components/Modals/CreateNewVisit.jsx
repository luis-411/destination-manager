import {useMap} from "usehooks-ts";
import React from "react";
import {Form} from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import usePostHistory from "../../api/history/usePostHistory";

export const CreateNewVisit = ({ country }) => {
  const { createNewVisit }  = usePostHistory();

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
    console.log('save new visit');


    createNewVisit(visit, ['photos']);
  }

  return (
    <div>
      <h4 className={'fs-5 fw-bold'}>Create new visit to {country.country}</h4>
      <div>
        <Form.Label htmlFor="title">{visitForm.get('title').label}</Form.Label>
        <Form.Control
          value={visit.get('title').value}
          id={visitForm.get('title').id}
          placeholder={visitForm.get('title').label}
          aria-label={'Trip to'}
          onChange={visitForm.get('title').onChange}
        />
      </div>
      <div>
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
      <button className='btn btn-primary' onClick={onSave}>Save</button>
    </div>
  )
};

export default CreateNewVisit;