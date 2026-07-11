import { useContext } from 'react'
import { StudyContext } from './studyContext'

export const useStudy = () => useContext(StudyContext)
