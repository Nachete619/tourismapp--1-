"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { useRouter } from "next/router"
import { Input } from "@nextui-org/react"
import { SearchIcon } from "./SearchIcon"

const GlobalSearch = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const handleSearch = useCallback(() => {
    if (searchTerm.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
    }
  }, [searchTerm, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <Input
      placeholder="Search..."
      aria-label="Search"
      value={searchTerm}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      contentLeft={<SearchIcon />}
      onContentLeftClick={handleSearch}
    />
  )
}

export default GlobalSearch
