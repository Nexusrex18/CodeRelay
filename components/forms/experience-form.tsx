"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import type { Experience } from "@/types/resume"

interface ExperienceFormProps {
  data: Experience[]
  updateData: (data: Experience[]) => void
}

export function ExperienceForm({ data, updateData }: ExperienceFormProps) {
  const [experiences, setExperiences] = useState<Experience[]>(
    data.length > 0
      ? data
      : [
          {
            company: "",
            position: "",
            startDate: "",
            endDate: "",
            location: "",
            description: "",
          },
        ],
  )

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const updatedExperiences = [...experiences]
    updatedExperiences[index] = { ...updatedExperiences[index], [name]: value }
    setExperiences(updatedExperiences)
    updateData(updatedExperiences)
  }

  const addExperience = () => {
    const newExperiences = [
      ...experiences,
      { company: "", position: "", startDate: "", endDate: "", location: "", description: "" },
    ]
    setExperiences(newExperiences)
    updateData(newExperiences)
  }

  const removeExperience = (index: number) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index)
    setExperiences(updatedExperiences)
    updateData(updatedExperiences)
  }

  return (
    <div className="space-y-6">
      {experiences.map((experience, index) => (
        <Card key={index} className="relative">
          <CardContent className="pt-6">
            <div className="absolute top-4 right-4">
              {experiences.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeExperience(index)}
                  className="h-8 w-8 text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`company-${index}`}>Company/Organization</Label>
                  <Input
                    id={`company-${index}`}
                    name="company"
                    placeholder="Company Name"
                    value={experience.company}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`position-${index}`}>Position/Title</Label>
                  <Input
                    id={`position-${index}`}
                    name="position"
                    placeholder="Job Title"
                    value={experience.position}
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
                    value={experience.startDate}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`endDate-${index}`}>End Date</Label>
                  <Input
                    id={`endDate-${index}`}
                    name="endDate"
                    placeholder="MM/YYYY or Present"
                    value={experience.endDate}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`location-${index}`}>Location</Label>
                  <Input
                    id={`location-${index}`}
                    name="location"
                    placeholder="City, State"
                    value={experience.location}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`description-${index}`}>Description</Label>
                <Textarea
                  id={`description-${index}`}
                  name="description"
                  placeholder="Describe your responsibilities and achievements..."
                  className="min-h-[100px]"
                  value={experience.description}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button type="button" variant="outline" onClick={addExperience} className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add Another Experience
      </Button>
    </div>
  )
}

