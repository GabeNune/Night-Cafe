import { useState, useEffect, useCallback } from "react";
import { createPomodoro, getPomodoro } from "../../services/pomodoro.services";
import { getTasks } from "../../services/tasks.services";
import styles from "./styles.module.css";

const duracao = {
  foco: 25 * 60,
  descanso: 5 * 60,
  "descanso-longo": 15 * 60,
};

const CIRCUMFERENCE = 2 * Math.PI * 105; // ~659.7

export function Pomodoro() {
  const [pomodoro, setPomodoro] = useState([]);
  const [segundos, setSegundos] = useState(duracao["foco"]);
  const [modo, setModo] = useState("foco");
  const [ativo, setAtivo] = useState(false);
  const [ciclo, setCiclo] = useState(1);
  const [totalFoco, setTotalFoco] = useState(0);
  const [totalDescansos, setTotalDescansos] = useState(0);
  const [taskAtiva, setTaskAtiva] = useState("");
  const [tasks, setTasks] = useState([]);

  const duracaoAtual =
    modo === "foco"
      ? duracao["foco"]
      : modo === "descanso-longo"
        ? duracao["descanso-longo"]
        : duracao["descanso"];

  const progresso = segundos / duracaoAtual;
  const dashOffset = CIRCUMFERENCE * progresso;

  const nextModo = useCallback(() => {
    if (modo === "foco") {
      if (ciclo === 7) {
        setModo("descanso-longo");
        setCiclo((prev) => prev + 1);
        setSegundos(duracao["descanso-longo"]);
      } else {
        setModo("descanso");
        setCiclo((prev) => prev + 1);
        setSegundos(duracao["descanso"]);
      }
      setTotalFoco((prev) => prev + 1);
      createPomodoro({
        task_atual: taskAtiva || null,
        descansos: totalDescansos,
        foco: totalFoco,
        aconteceu: new Date(),
      });
    } else {
      if (ciclo === 8) {
        setModo("foco");
        setCiclo(1);
        setSegundos(duracao["foco"]);
      } else {
        setModo("foco");
        setSegundos(duracao["foco"]);
      }
      setTotalDescansos((prev) => prev + 1);
    }
  }, [modo, ciclo, totalDescansos, totalFoco, taskAtiva]);

  useEffect(() => {
    async function load() {
      const data = await getPomodoro();
      setPomodoro(data);
      const taskData = await getTasks();
      setTasks(taskData);
    }
    load();
  }, []);

  useEffect(() => {
    if (!ativo) return;
    const intervalo = setInterval(() => {
      setSegundos((prev) => {
        if (prev <= 1) {
          clearInterval(intervalo);
          nextModo();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalo);
  }, [ativo, nextModo]);

  function toggleAtivo() {
    setAtivo((prev) => !prev);
  }

  function reiniciar() {
    setAtivo(false);
    setSegundos(duracaoAtual);
  }

  function pular() {
    setAtivo(false);
    nextModo();
  }

  function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }

  function getModoLabel() {
    if (modo === "foco") return "Foco";
    if (modo === "descanso-longo") return "Descanso longo";
    return "Descanso";
  }

  const taskAtivaObj = tasks.find((t) => String(t.id) === String(taskAtiva));

  // 8 dots total (4 foco + descanso pairs per ciclo completo)
  const dots = Array.from({ length: 8 }, (_, i) => i < totalFoco);

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>
          Pomodoro <em>Timer</em>
        </h1>
        <p className={styles.pageSub}>Foco · Descanso · Registro</p>
      </div>

      <div className={styles.pomoLayout}>
        {/* Task selector */}
        <div className={styles.pomoTaskSelect}>
          <span className={styles.pomoTaskLabel}>Tarefa ativa</span>
          {taskAtivaObj ? (
            <div className={styles.pomoTaskActive}>
              <div className={styles.pomoTaskDot}></div>
              <span className={styles.pomoTaskName}>{taskAtivaObj.nome}</span>
            </div>
          ) : (
            <select
              className={styles.pomoSelect}
              value={taskAtiva}
              onChange={(e) => setTaskAtiva(e.target.value)}
            >
              <option value="">Selecione uma tarefa...</option>
              {tasks.map((task) => (
                <option key={task.id} value={task.id}>
                  {task.nome}
                </option>
              ))}
            </select>
          )}
          {taskAtivaObj && (
            <button
              className={styles.pomoTaskClear}
              onClick={() => setTaskAtiva("")}
            >
              Trocar tarefa
            </button>
          )}
        </div>

        {/* Ring */}
        <div className={styles.pomoRing}>
          <svg width="240" height="240" viewBox="0 0 240 240">
            <circle
              className={styles.pomoRingTrack}
              cx="120"
              cy="120"
              r="105"
            />
            <circle
              className={styles.pomoRingFill}
              cx="120"
              cy="120"
              r="105"
              style={{
                strokeDasharray: CIRCUMFERENCE,
                strokeDashoffset: dashOffset,
                stroke: modo === "foco" ? "#c4622d" : "#b8860b",
              }}
            />
          </svg>
          <div className={styles.pomoCenter}>
            <div className={styles.pomoTime}>{formatTime(segundos)}</div>
            <div className={styles.pomoLabel}>{getModoLabel()}</div>
          </div>
        </div>

        {/* Controls */}
        <div className={styles.pomoControls}>
          <button className={styles.btnPomo} onClick={reiniciar}>
            Reiniciar
          </button>
          <button
            className={`${styles.btnPomo} ${styles.primary}`}
            onClick={toggleAtivo}
          >
            {ativo ? "Pausar" : "Iniciar"}
          </button>
          <button className={styles.btnPomo} onClick={pular}>
            Pular
          </button>
        </div>

        {/* Session dots */}
        <div>
          <p className={styles.pomoTaskLabel} style={{ marginBottom: "8px" }}>
            Sessões de hoje
          </p>
          <div className={styles.pomoSessions}>
            {dots.map((done, i) => (
              <div
                key={i}
                className={`${styles.sessionDot} ${done ? styles.sessionDone : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
