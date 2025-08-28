import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { execSync } from 'child_process'
import { load } from 'cheerio'

const artifactsDir = './crew/.artifacts'

interface Agent { name: string; description: string }

const agents: Agent[] = [
  { name: 'SiteAnalyzer', description: 'Analyzes target site structure.' },
  { name: 'UIArchitect', description: 'Creates layout spec from analysis.' },
  { name: 'ComponentGenerator', description: 'Maps UI sections to components.' },
  { name: 'DataModeler', description: 'Designs product and cart data models.' },
  { name: 'CommerceFlowEngineer', description: 'Implements commerce flow scaffolding.' },
  { name: 'QAValidator', description: 'Runs typecheck, build and tests.' }
]

async function analyze(url: string) {
  console.log(`Analyzing ${url}`)
  const html = await fetch(url).then(r => r.text())
  const $ = load(html)
  const layoutSpec = {
    title: $('title').text(),
    sectionCount: $('section').length
  }
  if (!existsSync(artifactsDir)) mkdirSync(artifactsDir, { recursive: true })
  writeFileSync(`${artifactsDir}/LayoutSpec.json`, JSON.stringify(layoutSpec, null, 2))
  const componentMap = {
    header: $('header').length > 0,
    footer: $('footer').length > 0
  }
  writeFileSync(`${artifactsDir}/ComponentMap.json`, JSON.stringify(componentMap, null, 2))
}

function scaffold() {
  console.log('Scaffolding Next.js app ...')
  // App is pre-created; future enhancements could modify files within markers
}

function validate() {
  console.log('Running validations ...')
  try {
    execSync('pnpm typecheck', { stdio: 'inherit' })
    execSync('pnpm build', { stdio: 'inherit' })
    execSync('pnpm test', { stdio: 'inherit' })
  } catch (e) {
    console.error('Validation failed')
  }
}

async function run() {
  const urlIdx = process.argv.indexOf('--url')
  const url = urlIdx > -1 ? process.argv[urlIdx + 1] : ''
  if (!url) {
    console.error('Usage: pnpm crew:run --url <target>')
    process.exit(1)
  }
  console.log('Agents:', agents.map(a => a.name).join(', '))
  await analyze(url)
  scaffold()
  validate()
}

run()
