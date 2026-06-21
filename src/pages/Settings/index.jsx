import { useState, useEffect } from "react";
import {
  getCategories,
  createCategory,
  deleteCategory,
} from "../../services/categories.services";
import styles from "./styles.module.css";

export function Settings() {
  const [categories, setCategories] = useState([]);
  const [nome, setNome] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getCategories();
      setCategories(data);
    }
    load();
  }, []);

  async function handleAdd() {
    if (!nome.trim()) return;
    const nova = await createCategory(nome.trim());
    setCategories([...categories, nova]);
    setNome("");
  }

  async function handleDelete(id) {
    await deleteCategory(id);
    setCategories(categories.filter((c) => c.id !== id));
  }

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>
          Settings
        </h1>
        <p className={styles.pageSub}>Categorias · Configurações</p>
      </div>

      <div className={styles.layout}>
        <div className={styles.section}>
          <p className={styles.sectionTitle}>Categorias</p>
          <p className={styles.sectionDesc}>
            Categorias são usadas para organizar tarefas e blocos semanais.
          </p>

          <div className={styles.inputRow}>
            <input
              className={styles.input}
              placeholder="Nome da categoria..."
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
            <button className={styles.btn} onClick={handleAdd}>
              Adicionar
            </button>
          </div>

          <div className={styles.catList}>
            {categories.map((cat) => (
              <div key={cat.id} className={styles.catItem}>
                <div className={styles.catDot} />
                <span className={styles.catNome}>{cat.nome}</span>
                <button
                  className={styles.catDel}
                  onClick={() => handleDelete(cat.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
