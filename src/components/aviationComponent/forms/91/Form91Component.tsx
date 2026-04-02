import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { FileText, Maximize, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import {FilterForm} from "./FilterForm"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
const Form91Component = () => {
  // Placeholder data for Form 91
  const [events, setEvents] = useState([
    {
      time: "12:12",
      event: "PAPI RUNWAY 04 OUT OF ORDER",
      initial: "YD",
    },
    {
      time: "12:33",
      event: "PAPI RUNWAY 04 OUT OF ORDER",
      initial: "YD",
    },
  ]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    setEvents([data, ...events]);
    reset();
  };

  return (
    <div className="p-4 sm:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-1">
        
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg">
              <FileText className="w-5 h-5 text-indigo-400/80" />
            </div>
            <h1 className="text-3xl font-semibold tracking-tight uppercase text-foreground/80">
              Form 91 Kayıtları
            </h1>
          </div>
          <p className="text-muted-foreground/70 text-sm italic font-light">
            Günlük faaliyet ve uçuş takip formu.
          </p>
        </div>
        <FilterForm />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Card>
          <div className="flex items-center gap-2">
            <h1 className="px-4 text-lg font-semibold tracking-tight uppercase text-foreground/80">
              Tulga Control Tower Form - 91
            </h1>
            <Button type="submit">
              <Plus className="w-4 h-4" />
              New Event
            </Button>
          </div>
          <div className="grid grid-cols-1   gap-4 px-4">
            <Field>
              <FieldLabel>Time</FieldLabel>
              <Input
                type="time"
                {...register("time", { required: true })}
                placeholder="00:00"
              ></Input>
              {errors.time && (
                <span className="text-xs text-red-500">Time required</span>
              )}
            </Field>
            <Field>
              <FieldLabel>Event</FieldLabel>
              <Input
                {...register("event", { required: true, minLength: 3 })}
                placeholder="Enter Event"
              ></Input>
              {errors.event && (
                <span className="text-xs text-red-500">Event required</span>
              )}
            </Field>
            <Field>
              <FieldLabel>Initial</FieldLabel>
              <Input
                {...register("initial", {
                  required: true,
                  minLength: 2,
                  maxLength: 2,
                })}
                placeholder="Enter Your Initials"
              ></Input>
              {errors.initial && (
                <span className="text-xs text-red-500">
                  Initial must be 2 characters
                </span>
              )}
            </Field>
            <Field>
              <FieldLabel>Date</FieldLabel>
              <Input value={new Date().toLocaleDateString()} disabled></Input>
            </Field>
          </div>
        </Card>
        <ScrollArea className="h-96  rounded-md border">
          <Card className="">
            {events.map((item: any, index: number) => {
              const { time, event, initial } = item;
              return (
                <Card className="m-4 border-blue-400 shadow-lg" key={item.time}>
                  <div className="grid  grid-cols-1  gap-4 px-4">
                    <div className="flex gap-4">
                      <Badge className="bg-blue-200 text-blue-600">
                        {index + 1}
                      </Badge>
                      <Badge>{new Date().toLocaleDateString()}</Badge>
                    </div>
                    <Input disabled placeholder="Time" value={time}></Input>
                    <Input disabled placeholder="Event" value={event}></Input>
                    <Input
                      disabled
                      placeholder="Initial"
                      value={initial}
                    ></Input>
                  </div>
                </Card>
              );
            })}
          </Card>
        </ScrollArea>
      </form>
    </div>
  );
};

export default Form91Component;
