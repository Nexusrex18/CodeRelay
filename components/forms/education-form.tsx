"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import type { Education } from "@/types/resume"

interface EducationFormProps {
  data: Education[]
  updateData: (data: Education[]) => void
}

export function EducationForm({ data, updateData }: EducationFormProps) {
  const [educations, setEducations] = useState<Education[]>(
    data.length > 0
      ? data
      : [
          {
            institution: "",
            degree: "",
            field: "",
            startDate: "",
            endDate: "",
            location: "",
          },
        ],
  )

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const updatedEducations = [...educations]
    updatedEducations[index] = { ...updatedEducations[index], [name]: value }
    setEducations(updatedEducations)
    updateData(updatedEducations)
  }

  const addEducation = () => {
    const newEducations = [
      ...educations,
      { institution: "", degree: "", field: "", startDate: "", endDate: "", location: "" },
    ]
    setEducations(newEducations)
    updateData(newEducations)
  }

  const removeEducation = (index: number) => {
    const updatedEducations = educations.filter((_, i) => i !== index)
    setEducations(updatedEducations)
    updateData(updatedEducations)
  }

  return (
    <div className="space-y-6">
      {educations.map((education, index) => (
        <Card key={index} className="relative">
          <CardContent className="pt-6">
            <div className="absolute top-4 right-4">
              {educations.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeEducation(index)}
                  className="h-8 w-8 text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`institution-${index}`}>Institution</Label>
                <Input
                  id={`institution-${index}`}
                  name="institution"
                  placeholder="University/College Name"
                  value={education.institution}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`degree-${index}`}>Degree</Label>
                  <Input
                    id={`degree-${index}`}
                    name="degree"
                    placeholder="Bachelor's, Master's, etc."
                    value={education.degree}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`field-${index}`}>Field of Study</Label>
                  <Input
                    id={`field-${index}`}
                    name="field"
                    placeholder="Computer Science, Business, etc."
                    value={education.field}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                  <Input
                    id={`startDate-${index}`}
                    name="startDate"
                    placeholder="MM/YYYY"
                    value={education.startDate}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`endDate-${index}`}>End Date</Label>
                  <Input
                    id={`endDate-${index}`}
                    name="endDate"
                    placeholder="MM/YYYY or Present"
                    value={education.endDate}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`location-${index}`}>Location</Label>
                  <Input
                    id={`location-${index}`}
                    name="location"
                    placeholder="City, State"
                    value={education.location}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button type="button" variant="outline" onClick={addEducation} className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add Another Education
      </Button>
    </div>
  )
}

