# API Testing Guide

Este documento contiene ejemplos de cómo probar los endpoints del API.

## Usando REST Client (VSCode Extension)

Si tienes la extensión REST Client instalada en VSCode, puedes usar el archivo `test-endpoints.http` para probar los endpoints directamente.

## Usando curl (PowerShell)

### Health Check
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/health" -Method Get | ConvertTo-Json
```

### Get API Info
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api" -Method Get | ConvertTo-Json
```

### Get Student Study Time
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/students/1/study-time" -Method Get | ConvertTo-Json
```

### Get Student Age
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/students/1/age" -Method Get | ConvertTo-Json
```

### Get Birthday Countdown
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/students/1/birthday-countdown" -Method Get | ConvertTo-Json
```

### Get Student Guardians
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/students/1/guardians" -Method Get | ConvertTo-Json
```

### Get Guardian Students
```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/guardians/1/students" -Method Get | ConvertTo-Json
```

## Usando curl (Linux/Mac)

### Health Check
```bash
curl http://localhost:3001/health
```

### Get Student Study Time
```bash
curl http://localhost:3001/api/students/1/study-time
```

### Get Student Age
```bash
curl http://localhost:3001/api/students/1/age
```

### Get Birthday Countdown
```bash
curl http://localhost:3001/api/students/1/birthday-countdown
```

### Get Student Guardians
```bash
curl http://localhost:3001/api/students/1/guardians
```

### Get Guardian Students
```bash
curl http://localhost:3001/api/guardians/1/students
```

## Respuestas Esperadas

### Study Time Example
```json
{
  "studentId": 123,
  "years": 1,
  "months": 2,
  "days": 10,
  "totalDays": 437,
  "since": "2024-09-01",
  "asOf": "2026-01-11"
}
```

### Age Example
```json
{
  "studentId": 123,
  "years": 6,
  "months": 3,
  "days": 5,
  "totalDays": 2330,
  "birthDate": "2019-09-04",
  "asOf": "2026-01-11"
}
```

### Birthday Countdown Example
```json
{
  "studentId": 123,
  "daysUntil": 95,
  "nextBirthday": "2026-03-14",
  "asOf": "2026-01-11"
}
```

### Student Guardians Example
```json
[
  {
    "GuardianID": 10,
    "FirstName": "Ana",
    "LastName": "Perez",
    "Relationship": "Mother"
  },
  {
    "GuardianID": 11,
    "FirstName": "Luis",
    "LastName": "Perez",
    "Relationship": "Father"
  }
]
```

### Guardian Students Example
```json
[
  {
    "StudentID": 123,
    "FirstName": "Juan",
    "LastName": "Perez",
    "GradeID": 2,
    "Relationship": "Son"
  }
]
```

## Manejo de Errores

### 404 - Not Found
```json
{
  "error": "Student not found"
}
```

### 400 - Bad Request
```json
{
  "error": "Invalid student ID"
}
```

### 500 - Internal Server Error
```json
{
  "error": "Internal server error"
}
```
