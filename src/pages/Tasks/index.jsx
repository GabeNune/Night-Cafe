import { useState, useEffect } from "react";
import {
  createTasks,
  deleteTasks,
  getTasks,
  updateTasks,
} from "../../services/tasks.services";
import styles from "./styles.module.css";
import { getCategories } from "../../services/categories.services";

export function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("1");
  const [categories, setCategories] = useState([]);
  const pendentes = tasks.filter((task) => !task.concluida).length;
  const concluidas = tasks.filter((task) => task.concluida === true).length;

  useEffect(() => {
    async function load() {
      const data = await getTasks();
      setTasks(data);
    }
    load();
  }, []);

  useEffect(() => {
    async function loadCategories() {
      const data = await getCategories();
      setCategories(data);
    }
    loadCategories();
  }, []);

  async function handleAdd() {
    const novaTask = await createTasks({ nome, categoria });
    setTasks([...tasks, novaTask]);
    setNome("");
    setCategoria("1");
  }

  async function handleDelete(id) {
    await deleteTasks(id);
    setTasks(tasks.filter((task) => task.id !== id));
  }

  async function handleUpdate(id) {
    await updateTasks(id, { concluida: true });
    setTasks(
      tasks.map((task) =>
        Number(task.id) === Number(id) ? { ...task, concluida: true } : task,
      ),
    );
  }

  function getDiaAtual() {
    const hoje = new Date();
    const dia = hoje.toLocaleDateString("pt-BR", { weekday: "long" });
    const data = hoje.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return `${dia.charAt(0).toUpperCase() + dia.slice(1)} · ${data}`;
  }

  function getCatNome(categoriaId) {
    const cat = categories.find((c) => Number(c.id) === Number(categoriaId));
    return cat ? cat.nome : "";
  }

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>
          Daily <em>Tasks</em>
        </h1>
        <p className={styles.pageSub}>{getDiaAtual()}</p>
      </div>

      <div className={styles.layout}>
        <div className={styles.left}>
          <div className={styles.inputRow}>
            <input
              className={styles.input}
              placeholder="Nova tarefa"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
            <select
              className={styles.select}
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </select>
            <button className={styles.btn} onClick={handleAdd}>
              Adicionar
            </button>
          </div>

          <div className={styles.taskList}>
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`${styles.taskItem} ${task.concluida ? styles.done : ""}`}
              >
                <div className={styles.taskCheck}>
                  <div className={styles.taskCheckDot}></div>
                </div>
                <span className={styles.taskName}>{task.nome}</span>
                <span className={styles.taskCat}>
                  {getCatNome(task.categoria)}
                </span>
                <button
                  className={styles.taskDel}
                  onClick={() => handleDelete(task.id)}
                >
                  ✕
                </button>
                <button
                  className={styles.taskDone}
                  onClick={() => handleUpdate(task.id)}
                >
                  ✓
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.statsCard}>
            <p className={styles.statsTitle}>Resumo do dia</p>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>Concluídas</span>
              <span className={styles.statVal}>{concluidas}</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>Pendentes</span>
              <span className={styles.statVal}>{pendentes}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
