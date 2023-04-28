import './App.css';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { enUS } from "@mui/material/locale";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alarm from './Alarm';

function App() {
  const [alarm, setAlarm] = useState(dayjs('2022-04-17T15:30'));
  const [alarmSet, setAlarmSet] = useState(false);
  const [time, setTime] = useState(new Date());

  async function getAPI(url) {
    
    const response = await fetch(url);
    
    let data = await response.json();
    console.log(data);
    if (response) {
        setAlarm(data.alarm);
        if (data.alarm !== "") {
          setAlarmSet(true);
        } else {
          setAlarmSet(false);
        }
    }
}

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
      getAPI("https://ps70-final.vercel.app/");
    }, 1000);

    return () => clearInterval(interval);

  }, []);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function process(newValue) {
    setAlarmSet(true);
    
    const jsonData = JSON.stringify({
      alarm: newValue.format('h:mm A'),
      state: 0,
      id: getRandomInt(0, 10000)
    });

    fetch('https://ps70-final.vercel.app/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: jsonData
    })
      .then(response => console.log(response))
  }

  function cancel() {
    setAlarmSet(false);
    setAlarm("");

    const jsonData = JSON.stringify({
      alarm: "",
      state: 0,
      id: getRandomInt(0, 10000)
    });
    fetch('https://ps70-final.vercel.app/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: jsonData
    })
      .then(response => console.log(response))
  }

  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs} localeText={
        {
          ...enUS,
          okButtonLabel: "Set Alarm",
          cancelButtonLabel: "Cancel",
        }
      }>
        <Container component="main" maxWidth="sm">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2>The Current Time Is:</h2>
            <Typography component="h1" variant="h1">
              {time.toLocaleTimeString()}
            </Typography>
            <Alarm alarm={alarm} setAlarm={alarmSet} cancel={cancel} process={process} />
          </Box>
        </Container>
        <div className="footer">
          <h5>Created by Jackson Moody for PS70, May 2023</h5>
        </div>
      </LocalizationProvider>
    </div>
  );
}

export default App;
