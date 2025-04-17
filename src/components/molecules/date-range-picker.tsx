import * as React from "react"
import { format, isSameDay } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange, SelectRangeEventHandler } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "../atoms/ui/button"
import { Calendar } from "../atoms/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../atoms/ui/popover"

export interface DatePickerWithRangeProps {
  from: Date
  to: Date
  onChange: (range: { from: Date; to: Date }) => void
  className?: string
}

export function DatePickerWithRange({
  from,
  to,
  onChange,
  className,
}: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange>({ from, to })
  const same = isSameDay

  React.useEffect(() => {
    setDate({ from, to })
  }, [from, to])

  const handleSelect: SelectRangeEventHandler = (r) => {
    if (!r) return

    if (date.from && date.to) {
      if (r.from && !r.to && same(r.from, date.from)) {
        setDate({ from: date.to, to: undefined })
        return
      }
      if (r.from && !r.to && same(r.from, date.to)) {
        setDate({ from: date.from, to: undefined })
        return
      }
      if (
        r.from &&
        r.to &&
        same(r.from, date.from) &&
        same(r.to, date.to)
      ) {
        setDate({ from: undefined, to: undefined })
        return
      }
    }

    if (date.from && !date.to && r.from && !r.to && same(r.from, date.from)) {
      setDate({ from: undefined, to: undefined })
      return
    }

    setDate(r)
    if (r.from && r.to) onChange({ from: r.from, to: r.to })
  }

  const handleDayClick = (day: Date) => {
    if (date.from && date.to) {
      if (same(day, date.from)) {
        setDate({ from: date.to, to: undefined })
        return
      }
      if (same(day, date.to)) {
        setDate({ from: date.from, to: undefined })
        return
      }
    }

    if (date.from && !date.to && same(day, date.from)) {
      setDate({ from: undefined, to: undefined })
    }
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date.from ? (
              date.to ? (
                `${format(date.from, "LLL dd, y")} - ${format(
                  date.to,
                  "LLL dd, y"
                )}`
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date.from}
            selected={date}
            onSelect={handleSelect}
            onDayClick={handleDayClick}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
