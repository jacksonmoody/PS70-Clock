import Typography from "@mui/material/Typography";
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import Button from "@mui/material/Button";
import dayjs from 'dayjs';

export default function Alarm(props) {
    if (props.setAlarm) {
        return (
            <>
                <h2 component="h1" variant="h4">
                    Your Next Alarm Is Set For:
                </h2>
                <Typography component="h1" variant="h1">
                    {props.alarm}
                </Typography>
                <Button variant="contained" size="large" onClick={() => props.cancel()}  sx={{marginTop: 3}}>Reset Alarm</Button>
            </>
        )
    } else {
        return (
            <>
                <h2 component="h1" variant="h4">
                    You have no alarms set. Please select a time below:
                </h2>
                <MobileTimePicker
                    label="Set Alarm"
                    defaultValue={dayjs()}
                    disablePast
                    onAccept={(newValue) => props.process(newValue)}
                />
            </>
        )
    }
}