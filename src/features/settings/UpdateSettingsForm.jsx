import {useState} from "react"
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import useGetSettingData from './useGetSettingData';
import useUpdateSettings from './useUpdateSettings';

function UpdateSettingsForm() {
  const [updatedField, setUpdatedField] = useState(null)
  const {isLoading, settings} = useGetSettingData()
  const {isUpdating, mutate} = useUpdateSettings()

  function handleUpdate(e, field){
    const {value} = e.target
    if(!value || +value === settings[field]) return
    setUpdatedField(field)
    mutate({[field]: value})
  }
  
  if( isLoading) return <Spinner />
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='minBookingLength'  defaultValue={settings?.minBookingLength} onBlur={(e) => handleUpdate(e, 'minBookingLength')} disabled = {updatedField === 'minBookingLength' && isUpdating} />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='maxBookingLength'
        defaultValue={settings?.maxBookingLength} onBlur={(e) => handleUpdate(e, 'maxBookingLength')} disabled = {updatedField === 'maxBookingLength'&& isUpdating }/>
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='maxGuestperBooking' defaultValue={settings?.maxGuestperBooking} onBlur={(e) => handleUpdate(e, 'maxGuestperBooking')} disabled = {updatedField === 'maxGuestperBooking' && isUpdating}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfastPrice' onBlur={(e) => handleUpdate(e, 'breakfastPrice')} disabled = {updatedField === 'breakfastPrice' && isUpdating} defaultValue={settings?.breakfastPrice}/>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
