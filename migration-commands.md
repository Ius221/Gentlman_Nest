# 🚀 TypeORM Migrations Cheat Sheet

## 📦 Create Migration File

```bash
npx typeorm migration:create src/database/migrations/<migration-name>
```

---

## ⚙️ Generate Migration File (Auto from Entities)

```bash
npm run typeorm migration:generate -- src/database/migrations/<migration-name> -d src/database/data-source.ts
```

---

## ▶️ Run Migrations

```bash
npm run typeorm migration:run -- -d src/database/data-source.ts
```

---

## ⏪ Revert Last Migration

```bash
npm run typeorm migration:revert -- -d src/database/data-source.ts
```

---

## 📋 Show Migration Status

```bash
npm run typeorm migration:show -- -d src/database/data-source.ts
```

---

## 📝 Notes

- `-o` → Generate JavaScript (`.js`) migration file
- `-p` → Pretty formatted code

### Example with Flags

```bash
npm run typeorm migration:generate -- src/database/migrations/<migration-name> -d src/database/data-source.ts -o -p
```
