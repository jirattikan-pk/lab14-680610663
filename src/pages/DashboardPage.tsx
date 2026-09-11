import UserRegisterCard from "../components/UserRegisterCard";
import type { Registrant } from "../libs/Registrant";
import { useState, useEffect } from "react";

const STORAGE_KEY = "lap14";
const defaultTasks: Registrant[] = [];

function loadTasks(): Registrant[] {
  try {
    
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultTasks;
  } catch {
    return defaultTasks; // เผื่อข้อมูลใน localStorage เสีย
  }
}

export default function DashboardPage() {
  const [registrant, setRegistrant] = useState<Registrant[]>(loadTasks);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(registrant));
  }, [registrant]);

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      <div className="mt-3">
        <label className="form-label">
          ผู้ลงทะเบียนแล้ว ({registrant.length} คน)
        </label>
          <div className="d-flex flex-column gap-2">
          {registrant.map((regist) =>(
            <UserRegisterCard
            key={regist.id}
            id={regist.id}
            fullName={regist.fullName}
            gender={regist.gender}
            plan={regist.plan}
            total={regist.total}
            extraItems={regist.extraItems}
            />
          ))}
          </div>
        
      </div>
    </div>
  );
}
