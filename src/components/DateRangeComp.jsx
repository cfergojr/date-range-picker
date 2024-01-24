import { useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-date-range'

import format from 'date-fns/format'
import { addDays, isWeekend } from 'date-fns'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const DateRangeComp = () => {

    //date state 
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ])

    function calcWeekends(startDate, endDate) {
        if (startDate > endDate) return false;
        var date  = startDate;
        var dates = [];
    
        while (date < endDate) {
            console.log(date)
            if (isWeekend(date)) dates.push(new Date(date));
            date.setDate( date.getDate() + 1 );
        }
    
        return dates;
    }
    
    const disabledDates = calcWeekends(new Date(), addDays(new Date(), 100))

    // open clase
    const [open, setOpen] = useState(false)

    const refOne = useRef(null)

    useEffect(() => {
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnOutsideClick, true)
    }, [])

    // hide calendar on ESC 
    const hideOnEscape = (e) => {
        // console.log(e.key)
        if( e.key === "Escape" ) {
            setOpen(false)
        }
    }

    // hide calendar on off-click
    const hideOnOutsideClick = (e) => {
        if( refOne.current && !refOne.current.contains(e.target)) {
            setOpen(false)
        }
    }

    return (
        <div className="calendarWrap">

            <input 
                value= {` ${format(range[0].startDate, "yyyy-MM-dd")} - ${format(range[0].endDate, "yyyy-MM-dd")}` }
                readOnly
                className="inputBox"
                onClick={ () => setOpen(open => !open) }
            />

            <div ref={refOne}>
                {open &&
                <DateRange
                    onChange = {item => setRange([item.selection])}
                    editableDateInputs={true}
                    moveRangeOnFirstSelection={false}
                    ranges={range}
                    months={1}
                    direction="horizontal"
                    className="calendarElement" 
                    disabledDates={disabledDates}
                />
                }
            </div>
        
        </div>
    )
}

export default DateRangeComp