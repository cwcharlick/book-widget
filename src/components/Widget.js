import React, { useState, useEffect } from 'react';

import Calendar from './Calendar';
import TimePicker from './TimePicker';
import CoversPicker from './CoversPicker';
import SearchForm from './SearchForm';
import NoAvailability from './NoAvailability';
import PleaseMove from './PleaseMove';
import Details from './Details';
import Confirmation from './Confirmation';
import {
  getPublicBookings,
  getPublicPacingOverrides,
  getPublicPacings,
  getPublicRestaurant,
  getPublicSchedules,
  getPublicStatuses,
  getPublicTables,
} from '../api/public';
import { findAvailability } from '../helper/functions';

// useful for reference
// const bookingSections = [
//   { id: 1, name: 'covers' },
//   { id: 2, name: 'time' },
//   { id: 3, name: 'date' },
//   { id: 4, name: 'search' },
//   { id: 5, name: 'please move' },
//   { id: 7, name: 'no availability' },
//   { id: 8, name: 'details' },
//   { id: 9, name: 'confirmation' },
// ];

function Widget({ h = 6, m = 30, a = false, c = 2 }) {
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const [restaurantId, setRestaurantId] = useState(null);
  const [allSchedules, setAllSchedules] = useState(null);
  const [allTables, setAllTables] = useState(null);
  const [bookings, setBookings] = useState(null);
  const [allPacings, setAllPacings] = useState(null);
  const [allPacingOverrides, setAllPacingOverrides] = useState(null);
  const [allStatuses, setAllStatuses] = useState(null);
  const [options, setOptions] = useState([]);

  const todayWithTime = new Date();
  const today = new Date(
    todayWithTime.getFullYear(),
    todayWithTime.getMonth(),
    todayWithTime.getDate()
  );
  const [selectedDate, setSelectedDate] = useState(today);
  const [hours, setHours] = useState(h);
  const [minutes, setMinutes] = useState(m);
  const [am, setAm] = useState(a);
  const [covers, setCovers] = useState(c);
  const [visible, setVisible] = useState(4);

  const slug = window.location.pathname.split('/')[1];
  useEffect(() => {
    getPublicRestaurant(slug).then((v) => {
      setRestaurantId(v);
    });
  }, []);

  useEffect(() => {
    if (!restaurantId) return;
    getPublicBookings(restaurantId, selectedDate).then((v) => {
      setBookings(v);
      setLoading(false);
    });
  }, [restaurantId, selectedDate]);

  useEffect(() => {
    if (!restaurantId) return;
    async function getData(restaurantId) {
      const results = await Promise.all([
        getPublicSchedules(restaurantId),
        getPublicTables(restaurantId),
        getPublicPacings(restaurantId),
        getPublicStatuses(restaurantId),
        getPublicPacingOverrides(restaurantId),
      ]);
      return results;
    }

    const results = getData(restaurantId);
    results.then((res) => {
      setAllPacings(res[2]);
      setAllSchedules(res[0]);
      setAllStatuses(res[3]);
      setAllTables(res[1]);
      setAllPacingOverrides(res[4]);
      setLoading2(false);
    });
  }, [restaurantId]);

  useEffect(() => {
    if (loading || loading2) return;

    try {
      setOptions(
        findAvailability(
          selectedDate,
          allSchedules,
          allTables,
          allPacings,
          allStatuses,
          bookings,
          covers,
          am,
          hours,
          minutes,
          allPacingOverrides
        )
      );
    } catch {
      setOptions([]);
    }
  }, [selectedDate, hours, minutes, am, covers, loading, loading2]);

  return (
    <div className="booking-widget">
      <form>
        <CoversPicker
          covers={covers}
          setCovers={setCovers}
          visible={visible}
          setVisible={setVisible}
        />
        <TimePicker
          hours={hours}
          setHours={setHours}
          minutes={minutes}
          setMinutes={setMinutes}
          am={am}
          setAm={setAm}
          visible={visible}
          setVisible={setVisible}
        />
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          today={today}
          visible={visible}
          setVisible={setVisible}
        />
        <SearchForm
          selectedDate={selectedDate}
          hours={hours}
          minutes={minutes}
          am={am}
          covers={covers}
          visible={visible}
          setVisible={setVisible}
          loading={loading}
          options={options}
        />
        <NoAvailability visible={visible} setVisible={setVisible} />
        <PleaseMove
          visible={visible}
          setVisible={setVisible}
          hours={hours}
          setHours={setHours}
          minutes={minutes}
          setMinutes={setMinutes}
          am={am}
          setAm={setAm}
          options={options}
        />
        <Details
          visible={visible}
          setVisible={setVisible}
          covers={covers}
          hours={hours}
          minutes={minutes}
          am={am}
          selectedDate={selectedDate}
        />
        <Confirmation visible={visible} setVisible={setVisible} />
      </form>
    </div>
  );
}

export default Widget;
