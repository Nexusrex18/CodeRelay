"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface SkillsFormProps {
  data: string[]
  updateData: (data: string[]) => void
}

export function SkillsForm({ data, updateData }: SkillsFormProps) {
  const [skills, setSkills] = useState<string[]>(data)
  const [currentSkill, setCurrentSkill] = useState("")

  const addSkill = () => {
    if (currentSkill.trim() !== "" && !skills.includes(currentSkill.trim())) {
      const updatedSkills = [...skills, currentSkill.trim()]
      setSkills(updatedSkills)
      updateData(updatedSkills)
      setCurrentSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove)
    setSkills(updatedSkills)
    updateData(updatedSkills)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="skill">Add Skills</Label>
        <div className="flex space-x-2">
          <Input
            id="skill"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a skill (e.g., JavaScript, Project Management)"
            className="flex-1"
          />
          <Button type="button" onClick={addSkill}>
            Add
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Your Skills</Label>
        <div className="flex flex-wrap gap-2 p-4 border rounded-md min-h-[100px]">
          {skills.length === 0 ? (
            <p className="text-muted-foreground text-sm">No skills added yet. Add some skills above.</p>
          ) : (
            skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Suggested Skills</Label>
        <div className="flex flex-wrap gap-2">
          {[
            "JavaScript",
            "React",
            "TypeScript",
            "HTML/CSS",
            "Node.js",
            "Project Management",
            "Communication",
            "Leadership",
            "Problem Solving",
            "Teamwork",
          ].map(
            (skill) =>
              !skills.includes(skill) && (
                <Badge
                  key={skill}
                  variant="outline"
                  className="px-3 py-1 text-sm cursor-pointer hover:bg-secondary"
                  onClick={() => {
                    setCurrentSkill(skill)
                    addSkill()
                  }}
                >
                  + {skill}
                </Badge>
              ),
          )}
        </div>
      </div>
    </div>
  )
}

