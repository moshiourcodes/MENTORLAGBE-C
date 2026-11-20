"use client"

import { useActionState, useEffect } from "react"
import { LoaderCircle, Plus } from "lucide-react"
import { toast } from "sonner"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import { Textarea } from "@/components/ui/textarea"

import { createTuition, type PostTuitionState } from "./actions"

const initialState: PostTuitionState = {}

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Programming",
  "IELTS",
  "Other",
]

const classLevels = [
  "Class 1-5",
  "Class 6-8",
  "Class 9-10",
  "HSC",
  "Admission",
  "University",
  "Other",
]

export function PostTuitionForm() {
  const [state, formAction, isPending] = useActionState(
    createTuition,
    initialState
  )

  useEffect(() => {
    if (state.error) {
      toast.error(state.error)
    }
  }, [state.error])

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="title">Tuition Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="e.g. HSC Physics Batch for Science Students"
          required
          minLength={3}
          maxLength={120}
          className="h-11"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <NativeSelect id="subject" name="subject" required className="w-full">
            <NativeSelectOption value="">Select subject</NativeSelectOption>
            {subjects.map((subject) => (
              <NativeSelectOption key={subject} value={subject}>
                {subject}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>

        <div className="space-y-2">
          <Label htmlFor="classLevel">Class Level</Label>
          <NativeSelect
            id="classLevel"
            name="classLevel"
            required
            className="w-full"
          >
            <NativeSelectOption value="">Select class level</NativeSelectOption>
            {classLevels.map((level) => (
              <NativeSelectOption key={level} value={level}>
                {level}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="mode">Mode</Label>
          <NativeSelect id="mode" name="mode" required className="w-full">
            <NativeSelectOption value="Online">Online</NativeSelectOption>
            <NativeSelectOption value="Offline">Offline</NativeSelectOption>
          </NativeSelect>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            placeholder="e.g. Dhanmondi, Dhaka"
            className="h-11"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="monthlyFee">Monthly Fee (৳)</Label>
          <Input
            id="monthlyFee"
            name="monthlyFee"
            type="number"
            min={1}
            step={1}
            placeholder="e.g. 3000"
            required
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="daysPerWeek">Days per Week</Label>
          <Input
            id="daysPerWeek"
            name="daysPerWeek"
            type="number"
            min={1}
            max={7}
            step={1}
            defaultValue={3}
            required
            className="h-11"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bannerImage">Banner Image URL (optional)</Label>
        <Input
          id="bannerImage"
          name="bannerImage"
          type="url"
          placeholder="https://example.com/banner.jpg"
          className="h-11"
        />
        <p className="text-xs text-muted-foreground">
          Direct ImgBB upload will be added in the media phase. For now you can
          paste an image URL.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Describe your teaching style, schedule, and what students will learn."
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          className="min-h-32"
        />
      </div>

      {state.error ? (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#399B98] px-5 text-sm font-semibold text-white transition hover:bg-[#2F8481] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? (
          <LoaderCircle size={16} className="animate-spin" />
        ) : (
          <Plus size={16} />
        )}
        {isPending ? "Submitting..." : "Submit for Approval"}
      </button>
    </form>
  )
}
