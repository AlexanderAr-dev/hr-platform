Чтобы собрать проект нужно открыть его, прописать npm install, чтобы установились все зависимости.
Далее нужно зайти в файл kit-vacation-calculator/package.json и там запустить билды:
"build:builder": "npm run --workspace=@app/builder build",
"build:kit:dev": "npm run --workspace=@app/kit build:dev",
"build:front-modules:dev": "npm run --workspace=@app/front-modules build:dev",
"build:ui:dev": "npm run --workspace=@app/ui build:dev",

Далее можно запустить проект нужно в этом же файле запустить
"dev:frontend": "npm run --workspace=@app/frontend run:dev -- --host 0.0.0.0",
