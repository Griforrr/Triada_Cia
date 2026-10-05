import React, { useState, useMemo } from 'react';
import {
  Shield,
  Lock,
  FileCheck,
  Server,
  AlertTriangle,
  CheckCircle2,
  Activity,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Terminal,
  Zap,
  ShieldAlert,
  Cpu,
  RefreshCw,
  Radio,
  Sliders,
  Check,
  X,
  HardDrive
} from 'lucide-react';

const PILLARS_DATA = {
  confidencialidad: {
    id: 'confidencialidad',
    title: 'Confidencialidad',
    code: 'PILAR-C',
    subtitle: 'Privacidad y Restricción de Acceso No Autorizado',
    colorName: 'amber',
    tag: 'Sigilo y Privacidad',
    icon: Lock,
    accentClass: 'text-amber-400 border-amber-500/40 bg-amber-500/10 shadow-amber-500/10',
    definition:
      'Garantiza que la información sensible solo sea visible y accesible para identidades, sistemas o procesos estrictamente autorizados. Previene la exfiltración y el espionaje corporativo.',
    threats: [
      { name: 'Phishing e Ingeniería Social', desc: 'Robo de contraseñas de administradores mediante engaños dirigidos.' },
      { name: 'Ataques Man-In-The-Middle (MITM)', desc: 'Intercepción de tráfico no cifrado en redes locales o públicas.' },
      { name: 'Fuga de Secretos en Repositorios', desc: 'Publicación involuntaria de tokens API y llaves privadas en código fuente.' },
      { name: 'Credenciales por Defecto', desc: 'Acceso ilícito mediante configuraciones de fábrica nunca modificadas.' }
    ],
    controls: [
      { code: 'NIST SC-28', title: 'Cifrado en Reposo (AES-256-GCM)' },
      { code: 'ISO 27001 A.9', title: 'Principio de Menor Privilegio (PoLP)' },
      { code: 'FIDO2 / WebAuthn', title: 'Autenticación Multifactor Resistente a Phishing' },
      { code: 'DLP Engine', title: 'Sistemas de Prevención de Fuga de Datos' }
    ],
    industryCase: {
      company: 'Brecha Equifax (147M de afectados)',
      problem: 'Un portal web sin parches permitió a atacantes exfiltrar historiales crediticios e información de identidad personal (PII) durante meses sin ser detectados.',
      lesson: 'Segmentación de datos, cifrado a nivel de columna y monitoreo continuo de consultas de lectura anómalas.'
    }
  },
  integridad: {
    id: 'integridad',
    title: 'Integridad',
    code: 'PILAR-I',
    subtitle: 'Exactitud, Fidelidad e Inalterabilidad de los Datos',
    colorName: 'lime',
    tag: 'Fidelidad Criptográfica',
    icon: FileCheck,
    accentClass: 'text-lime-400 border-lime-500/40 bg-lime-500/10 shadow-lime-500/10',
    definition:
      'Asegura que los datos no hayan sido alterados, manipulados, corrompidos o destruidos de forma maliciosa o accidental en ningún punto de su ciclo de vida.',
    threats: [
      { name: 'Inyección SQL (SQLi)', desc: 'Modificación arbitraria de tablas financieras, precios o permisos en bases de datos.' },
      { name: 'Alteración de Logs de Auditoría', desc: 'Borrador o modificación de bitácoras por cibercriminales para ocultar su rastro.' },
      { name: 'Envenenamiento de Caché DNS', desc: 'Redirección fraudulenta mediante falsificación de respuestas del servidor DNS.' },
      { name: 'Manipulación de Paquetes en Tránsito', desc: 'Alteración silenciosa del importe o destino de transacciones bancarias.' }
    ],
    controls: [
      { code: 'RFC 6234', title: 'Firmas Digitales y Hashes Criptográficos (SHA-256 / SHA-3)' },
      { code: 'WORM Storage', title: 'Almacenamiento de Bitácoras de Escritura Única (Inmutable)' },
      { code: 'CI/CD Signoff', title: 'Sellado de código binario y verificación de checksums' },
      { code: 'ACID Transactions', title: 'Controles de concurrencia y validación estricta de esquemas' }
    ],
    industryCase: {
      company: 'Ataque de Cadena de Suministro SolarWinds',
      problem: 'Actores de amenaza inyectaron código malicioso en una actualización legítima de software, vulnerando la integridad del binario distribuido.',
      lesson: 'Uso obligatorio de atestación criptográfica en pipelines (Sigstore), verificación de procedencia y control estricto de dependencias.'
    }
  },
  disponibilidad: {
    id: 'disponibilidad',
    title: 'Disponibilidad',
    code: 'PILAR-A',
    subtitle: 'Acceso Continuo, Oportuno y Resiliente a la Información',
    colorName: 'orange',
    tag: 'Uptime & Resiliencia',
    icon: Server,
    accentClass: 'text-orange-500 border-orange-500/40 bg-orange-500/10 shadow-orange-500/10',
    definition:
      'Garantiza que la infraestructura, redes, canales y servicios estén completamente operativos y accesibles cuando las identidades autorizadas los necesiten.',
    threats: [
      { name: 'Ataques DDoS Volumétricos', desc: 'Saturación deliberada con millones de peticiones que colapsan enlaces de red.' },
      { name: 'Ransomware Cifrador de Disco', desc: 'Bloqueo absoluto de bases de datos productivas y parálisis de operaciones críticas.' },
      { name: 'Caídas de Centros de Datos / Cortes Eléctricos', desc: 'Interrupción física de servidores sin conmutación por error en tiempo real.' },
      { name: 'Agotamiento de Recursos (Memory Leaks)', desc: 'Degradación progresiva de memoria en microservicios hasta la desconexión total.' }
    ],
    controls: [
      { code: 'Anycast DNS / WAF', title: 'Mitigación en Borde Anti-DDoS de Capa 3, 4 y 7' },
      { code: 'Alta Disponibilidad (HA)', title: 'Clústeres Kubernetes multi-zona con balanceadores de carga' },
      { code: 'Estrategia 3-2-1', title: 'Respaldos automatizados con copia desconectada (Air-gapped)' },
      { code: 'DRP / BCP Activos', title: 'Planes de Recuperación de Desastres con RTO y RPO menores a 15 min' }
    ],
    industryCase: {
      company: 'Interrupción Global de Red de Salud por Ransomware',
      problem: 'Un hospital sufrió el bloqueo total de sus historiales clínicos durante 9 días debido al cifrado masivo de sus servidores centrales.',
      lesson: 'Segmentación estricta de VLANs médicas, respaldos inmutables en la nube y pruebas periódicas de recuperación en frío.'
    }
  }
};

const INCIDENT_SCENARIOS = [
  {
    id: 'ransomware_locker',
    name: 'Operación Ransomware DarkLock',
    severity: 'CRÍTICA',
    trigger: 'Cifrado total de los discos SAN de producción por binario malicioso.',
    impacts: { C: 75, I: 40, A: 95 },
    affectedPillars: ['disponibilidad', 'confidencialidad'],
    primary: 'disponibilidad',
    terminalLog: '[SEC-ALERT] Almacenamiento masivo bloqueado con extensión .enc. Canal de pago suspendido.',
    mitigations: [
      { id: 'm1', label: 'Aislar nodos de red infectados (Quarantine VLAN)', efficiency: 30 },
      { id: 'm2', label: 'Restaurar desde instantáneas WORM inmutables (Air-Gap)', efficiency: 55 },
      { id: 'm3', label: 'Revocar claves maestras y regenerar tokens de servicio', efficiency: 15 }
    ]
  },
  {
    id: 'sqli_finance',
    name: 'Inyección SQL en Pasarela Contable',
    severity: 'ALTA',
    trigger: 'Extracción y manipulación de saldos en tabla balances mediante payload union-based.',
    impacts: { C: 65, I: 95, A: 20 },
    affectedPillars: ['integridad', 'confidencialidad'],
    primary: 'integridad',
    terminalLog: '[DB-WARNING] Sentencia SELECT ... UNION alteró 4,820 registros contables a las 03:14 UTC.',
    mitigations: [
      { id: 'm1', label: 'Migrar a Consultas Preparadas (Parameterized Queries)', efficiency: 45 },
      { id: 'm2', label: 'Revertir registros con base en el Log Criptográfico de Transacciones', efficiency: 40 },
      { id: 'm3', label: 'Imponer WAF con reglas avanzadas OWASP ModSecurity', efficiency: 15 }
    ]
  },
  {
    id: 'ddos_syn',
    name: 'Inundación DDoS de 800 Gbps (SYN Flood)',
    severity: 'CRÍTICA',
    trigger: 'Botnet masiva agota la tabla de conexiones TCP del Gateway fronterizo.',
    impacts: { C: 5, I: 10, A: 100 },
    affectedPillars: ['disponibilidad'],
    primary: 'disponibilidad',
    terminalLog: '[NET-FIRE] Tráfico de entrada supera umbral 980%. Latencia de enlace: 4,800ms (100% pérdida).',
    mitigations: [
      { id: 'm1', label: 'Desviar tráfico a Red Scrubbing Anycast con inspección DPI', efficiency: 50 },
      { id: 'm2', label: 'Activar Rate-Limiting agresivo y SYN Cookies en el Kernel', efficiency: 30 },
      { id: 'm3', label: 'Conmutar DNS a centro de datos georredundante secundario', efficiency: 20 }
    ]
  },
  {
    id: 'mfa_bypass',
    name: 'Fatiga MFA y Exfiltración de Correos VIP',
    severity: 'MEDIA-ALTA',
    trigger: 'Ataque de push-bombing fuerza la aceptación del token de un directivo.',
    impacts: { C: 100, I: 25, A: 10 },
    affectedPillars: ['confidencialidad'],
    primary: 'confidencialidad',
    terminalLog: '[AUTH-FAIL] 42 solicitudes Push en 3 minutos. Sesión administrativa iniciada desde IP extranjera.',
    mitigations: [
      { id: 'm1', label: 'Cierre forzado inmediato de todas las sesiones activas SSO', efficiency: 40 },
      { id: 'm2', label: 'Imponer llaves físicas FIDO2 (YubiKey) con coincidencia de número', efficiency: 40 },
      { id: 'm3', label: 'Auditoría forense de mensajes descargados vía eDiscovery', efficiency: 20 }
    ]
  }
];

const QUIZ_BANK = [
  {
    question: 'Si un empleado modifica maliciosamente el archivo de sueldos para aumentarse el salario, ¿qué pilar de la tríada CIA ha sido violentado directamente?',
    options: [
      'Disponibilidad, porque el dinero no estará disponible para otros.',
      'Integridad, porque la información financiera fue adulterada y dejó de ser verídica.',
      'Confidencialidad, porque nadie debería saber los sueldos.',
      'Autenticidad, porque el empleado usó su propia cuenta.'
    ],
    correct: 1,
    justification: 'La alteración, manipulación o falsificación de registros ataca de raíz la Integridad, que asegura datos exactos e inalterados.'
  },
  {
    question: 'Una empresa aplica cifrado AES-256 en su base de datos de pacientes. Si un hacker roba el disco físico pero no tiene la clave, ¿qué principio salvó a la empresa?',
    options: [
      'Disponibilidad',
      'Integridad',
      'Confidencialidad',
      'Resiliencia'
    ],
    correct: 2,
    justification: 'El cifrado hace los datos totalmente incomprensibles para personas no autorizadas, preservando la Confidencialidad.'
  },
  {
    question: 'Un servidor web cae repentinamente porque un ataque saturó todo el ancho de banda contratado. ¿Cuál es el impacto primario?',
    options: [
      'Pérdida total de Integridad en los ficheros del servidor.',
      'Compromiso de Confidencialidad por exposición pública.',
      'Vulneración de la Disponibilidad para los usuarios legítimos.',
      'Ruptura del protocolo de cifrado TLS.'
    ],
    correct: 2,
    justification: 'Cuando los recursos informáticos dejan de estar accesibles para quienes deben usarlos, el pilar violado es la Disponibilidad.'
  },
  {
    question: '¿Qué mecanismo criptográfico permite verificar simultáneamente la Integridad de un documento y la identidad del emisor?',
    options: [
      'Cifrado simétrico AES en modo CBC',
      'Firma Digital mediante criptografía asimétrica y Hash seguro',
      'Balanceo de carga en capa de transporte',
      'Copias de seguridad en discos WORM'
    ],
    correct: 1,
    justification: 'Una Firma Digital vincula la clave privada del autor con el hash del archivo; si una sola coma cambia, la firma queda invalidada.'
  }
];

export default function App() {
  const [selectedPillarKey, setSelectedPillarKey] = useState('confidencialidad');
  const [activeScenarioId, setActiveScenarioId] = useState(INCIDENT_SCENARIOS[0].id);
  const [appliedMitigations, setAppliedMitigations] = useState([]);
  const [activeTab, setActiveTab] = useState('concept'); // 'concept' | 'threats' | 'controls' | 'case'

  // Interactive Live Defense Lab Controls
  const [defenseToggles, setDefenseToggles] = useState({
    mfaHardware: true,
    aesEncryption: true,
    immutableHashes: false,
    haCluster: true,
    ddosScrubbing: false,
    auditLogs: true
  });

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);

  // Selected pillar object
  const currentPillar = PILLARS_DATA[selectedPillarKey];

  // Active scenario object
  const activeScenario = useMemo(() => {
    return INCIDENT_SCENARIOS.find((s) => s.id === activeScenarioId) || INCIDENT_SCENARIOS[0];
  }, [activeScenarioId]);

  const liveHealthMetrics = useMemo(() => {
    let c = 40;
    let i = 40;
    let a = 40;

    if (defenseToggles.mfaHardware) c += 35;
    if (defenseToggles.aesEncryption) c += 25;

    if (defenseToggles.immutableHashes) i += 35;
    if (defenseToggles.auditLogs) i += 25;

    if (defenseToggles.haCluster) a += 35;
    if (defenseToggles.ddosScrubbing) a += 25;

    return {
      confidencialidad: Math.min(100, c),
      integridad: Math.min(100, i),
      disponibilidad: Math.min(100, a)
    };
  }, [defenseToggles]);

  const currentMitigationScore = useMemo(() => {
    return activeScenario.mitigations.reduce((acc, mit) => {
      return appliedMitigations.includes(mit.id) ? acc + mit.efficiency : acc;
    }, 0);
  }, [activeScenario, appliedMitigations]);

  const toggleMitigation = (id) => {
    setAppliedMitigations((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleSelectScenario = (scenId) => {
    setActiveScenarioId(scenId);
    setAppliedMitigations([]);
  };

  const toggleDefense = (key) => {
    setDefenseToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const quizScore = useMemo(() => {
    let hits = 0;
    QUIZ_BANK.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) hits += 1;
    });
    return hits;
  }, [quizAnswers]);

  const handleSelectQuizOption = (qIdx, optIdx) => {
    if (isQuizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setIsQuizSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-mono selection:bg-amber-500 selection:text-stone-950">
      {/* Background carbon texture overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#44403c_1px,transparent_1px)] [background-size:20px_20px] z-0" />

      {}
      <header className="sticky top-0 z-50 border-b border-stone-800 bg-stone-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded border border-amber-500/50 bg-stone-900 text-amber-400 shadow-sm shadow-amber-500/20">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black tracking-widest text-lg text-stone-100 uppercase">
                  TRÍADA <span className="text-amber-400">CIA</span>
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-bold uppercase bg-stone-900 border border-stone-700 text-stone-400">
                  Ops v4.2
                </span>
              </div>
              <p className="text-[11px] text-stone-500 tracking-tight font-sans">
                Confidencialidad • Integridad • Disponibilidad
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-1 sm:gap-3 text-xs uppercase tracking-wider font-semibold">
            <a
              href="#pilares"
              className="px-3 py-1.5 rounded border border-transparent text-stone-400 hover:text-stone-100 hover:border-stone-800 hover:bg-stone-900 transition"
            >
              Matriz
            </a>
            <a
              href="#simulador"
              className="px-3 py-1.5 rounded border border-transparent text-stone-400 hover:text-amber-400 hover:border-amber-900/60 hover:bg-amber-950/20 transition flex items-center gap-1"
            >
              <Zap className="w-3.5 h-3.5" />
              Simulador
            </a>
            <a
              href="#telemetria"
              className="hidden md:flex px-3 py-1.5 rounded border border-transparent text-stone-400 hover:text-lime-400 hover:border-lime-900/60 hover:bg-lime-950/20 transition items-center gap-1"
            >
              <Sliders className="w-3.5 h-3.5" />
              Telemetría
            </a>
            <a
              href="#evaluacion"
              className="px-3 py-1.5 rounded border border-stone-700 bg-stone-900 text-stone-300 hover:border-amber-500 hover:text-amber-400 transition"
            >
              Examen
            </a>
          </nav>
        </div>
      </header>

      {}
      <section className="relative z-10 border-b border-stone-800/80 py-14 lg:py-20 bg-gradient-to-b from-stone-900/50 to-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-amber-500/30 bg-amber-950/30 text-amber-400 text-xs uppercase tracking-widest font-semibold">
                <Radio className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                Estándar Global de Ciberdefensa
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-100 leading-tight">
                EL TRIÁNGULO DORADO DE LA{' '}
                <span className="text-amber-400 underline decoration-amber-500/50 decoration-wavy decoration-2">
                  SEGURIDAD
                </span>
              </h1>

              <p className="font-sans text-stone-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Cualquier vulnerabilidad, ataque o directiva en ciberseguridad se reduce a la protección de tres activos primordiales:{' '}
                <strong className="text-amber-400 font-mono">Confidencialidad</strong> (solo ojos autorizados),{' '}
                <strong className="text-lime-400 font-mono">Integridad</strong> (datos puros y sin alterar) y{' '}
                <strong className="text-orange-500 font-mono">Disponibilidad</strong> (operatividad ininterrumpida).
              </p>

              <div className="pt-2 flex flex-wrap gap-3 text-xs">
                <div className="p-3 rounded border border-stone-800 bg-stone-900/80 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                  <span className="text-stone-400 font-mono">DEFENSA EN PROFUNDIDAD</span>
                </div>
                <div className="p-3 rounded border border-stone-800 bg-stone-900/80 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-lime-400" />
                  <span className="text-stone-400 font-mono">COMPLIANCE ISO 27001 / NIST</span>
                </div>
                <div className="p-3 rounded border border-stone-800 bg-stone-900/80 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  <span className="text-stone-400 font-mono">ZERO TRUST ARCHITECTURE</span>
                </div>
              </div>
            </div>

            {/* Tactical Live Radar Card */}
            <div className="lg:col-span-5">
              <div className="border border-stone-800 rounded-xl bg-stone-900/70 p-6 shadow-2xl relative overflow-hidden backdrop-blur-sm">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-200">
                      Estado Operacional de la Tríada
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-400">
                    REALTIME
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-amber-400 font-bold flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" /> [C] CONFIDENCIALIDAD
                      </span>
                      <span className="font-mono text-stone-300">{liveHealthMetrics.confidencialidad}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-800 overflow-hidden">
                      <div
                        className="h-full bg-amber-400 transition-all duration-500"
                        style={{ width: `${liveHealthMetrics.confidencialidad}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-lime-400 font-bold flex items-center gap-1.5">
                        <FileCheck className="w-3.5 h-3.5" /> [I] INTEGRIDAD
                      </span>
                      <span className="font-mono text-stone-300">{liveHealthMetrics.integridad}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-800 overflow-hidden">
                      <div
                        className="h-full bg-lime-400 transition-all duration-500"
                        style={{ width: `${liveHealthMetrics.integridad}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-orange-500 font-bold flex items-center gap-1.5">
                        <Server className="w-3.5 h-3.5" /> [A] DISPONIBILIDAD
                      </span>
                      <span className="font-mono text-stone-300">{liveHealthMetrics.disponibilidad}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-800 overflow-hidden">
                      <div
                        className="h-full bg-orange-500 transition-all duration-500"
                        style={{ width: `${liveHealthMetrics.disponibilidad}%` }}
                      />
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-[11px] text-stone-400 font-sans border-t border-stone-800/80 pt-3">
                  *Ajusta los interruptores en la sección de <strong className="text-stone-200">Telemetría</strong> para simular el fortalecimiento de controles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section id="pilares" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
              Desglose Técnico
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-100 tracking-tight uppercase">
              Los Tres Pilares Fundamentales
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 font-sans mt-1">
              Haz clic en cualquiera de los vectores para examinar amenazas, defensas y casos reales de impacto.
            </p>
          </div>

          {/* Pillar Selector Pills */}
          <div className="grid grid-cols-3 gap-1 bg-stone-900 p-1 rounded border border-stone-800">
            {Object.keys(PILLARS_DATA).map((key) => {
              const item = PILLARS_DATA[key];
              const isSelected = selectedPillarKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedPillarKey(key)}
                  className={`px-3 py-2 text-xs font-bold tracking-wider uppercase transition rounded ${
                    isSelected
                      ? key === 'confidencialidad'
                        ? 'bg-amber-500 text-stone-950 shadow'
                        : key === 'integridad'
                        ? 'bg-lime-400 text-stone-950 shadow'
                        : 'bg-orange-500 text-stone-950 shadow'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {item.code}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Pillar Dossier */}
        <div className="border border-stone-800 rounded-xl bg-stone-900/60 backdrop-blur-sm overflow-hidden">
          {/* Header of Pillar Card */}
          <div className="p-6 sm:p-8 border-b border-stone-800 bg-stone-900/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className={`p-3.5 rounded border ${
                  selectedPillarKey === 'confidencialidad'
                    ? 'border-amber-500/50 bg-amber-500/10 text-amber-400'
                    : selectedPillarKey === 'integridad'
                    ? 'border-lime-500/50 bg-lime-500/10 text-lime-400'
                    : 'border-orange-500/50 bg-orange-500/10 text-orange-500'
                }`}
              >
                <currentPillar.icon className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-stone-400 uppercase tracking-widest">
                    {currentPillar.tag}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded font-mono bg-stone-800 text-stone-300">
                    {currentPillar.code}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-stone-100 uppercase tracking-tight">
                  {currentPillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 font-sans">
                  {currentPillar.subtitle}
                </p>
              </div>
            </div>

            {/* Tab navigation inside dossier */}
            <div className="flex flex-wrap gap-1 bg-stone-950 p-1 rounded border border-stone-800 text-xs">
              <button
                onClick={() => setActiveTab('concept')}
                className={`px-3 py-1.5 rounded transition ${
                  activeTab === 'concept'
                    ? 'bg-stone-800 text-stone-100 font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Definición
              </button>
              <button
                onClick={() => setActiveTab('threats')}
                className={`px-3 py-1.5 rounded transition ${
                  activeTab === 'threats'
                    ? 'bg-stone-800 text-stone-100 font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Amenazas
              </button>
              <button
                onClick={() => setActiveTab('controls')}
                className={`px-3 py-1.5 rounded transition ${
                  activeTab === 'controls'
                    ? 'bg-stone-800 text-stone-100 font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Controles
              </button>
              <button
                onClick={() => setActiveTab('case')}
                className={`px-3 py-1.5 rounded transition ${
                  activeTab === 'case'
                    ? 'bg-stone-800 text-stone-100 font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Caso de Estudio
              </button>
            </div>
          </div>

          {/* Dossier Body Content */}
          <div className="p-6 sm:p-8">
            {activeTab === 'concept' && (
              <div className="space-y-6">
                <div className="p-5 rounded border border-stone-800 bg-stone-950/70">
                  <h4 className="text-xs uppercase font-bold text-stone-400 tracking-wider mb-2 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-amber-400" />
                    Principio Operativo
                  </h4>
                  <p className="font-sans text-stone-200 text-base leading-relaxed">
                    {currentPillar.definition}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded border border-stone-800/80 bg-stone-950/40">
                    <span className="text-[11px] text-stone-400 uppercase tracking-widest">¿Qué protege?</span>
                    <p className="text-xs sm:text-sm text-stone-300 font-sans mt-1">
                      {selectedPillarKey === 'confidencialidad' && 'Patentes, registros financieros, secretos de estado, credenciales y datos médicos confidenciales.'}
                      {selectedPillarKey === 'integridad' && 'Cuentas bancarias, código fuente compilado, bitácoras de eventos e instrucciones operativas críticas.'}
                      {selectedPillarKey === 'disponibilidad' && 'Sistemas de soporte vital, portales transaccionales, infraestructura SCADA y líneas de comunicación.'}
                    </p>
                  </div>
                  <div className="p-4 rounded border border-stone-800/80 bg-stone-950/40">
                    <span className="text-[11px] text-stone-400 uppercase tracking-widest">Consecuencia si falla</span>
                    <p className="text-xs sm:text-sm text-stone-300 font-sans mt-1">
                      {selectedPillarKey === 'confidencialidad' && 'Extorsión de rescates, multas regulatorias masivas (GDPR/HIPAA) y pérdida de ventaja competitiva.'}
                      {selectedPillarKey === 'integridad' && 'Decisiones corporativas basadas en datos corruptos, fraudes financieros invisibles y fallos catastróficos.'}
                      {selectedPillarKey === 'disponibilidad' && 'Parálisis operativa inmediata, incumplimiento de SLAs contractuales y quiebra por inactividad comercial.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'threats' && (
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4" />
                  Vectores de Ataque Primarios
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentPillar.threats.map((threat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded border border-stone-800 bg-stone-950/60 hover:border-rose-900/60 transition"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-rose-950/50 text-rose-400 border border-rose-900/50">
                          VEC-{idx + 1}
                        </span>
                        <h5 className="font-bold text-sm text-stone-200">{threat.name}</h5>
                      </div>
                      <p className="text-xs text-stone-400 font-sans">{threat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'controls' && (
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-lime-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Controles de Mitigación y Buenas Prácticas
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentPillar.controls.map((control, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded border border-stone-800 bg-stone-950/60 flex items-start gap-3 hover:border-lime-900/60 transition"
                    >
                      <div className="p-1 rounded bg-lime-950/50 border border-lime-800/50 text-lime-400 text-xs font-mono">
                        {control.code}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-stone-200">{control.title}</h5>
                        <p className="text-xs text-stone-400 font-sans mt-0.5">
                          Implementado a nivel de arquitectura y auditoría continua.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'case' && (
              <div className="p-6 rounded border border-stone-800 bg-stone-950/80 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2 border-b border-stone-800 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-amber-400 tracking-wider">
                      Ficha de Lección Aprendida
                    </span>
                    <h4 className="text-lg font-bold text-stone-100">
                      {currentPillar.industryCase.company}
                    </h4>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-stone-300">
                    Incidente Real
                  </span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm font-sans">
                  <div>
                    <strong className="text-rose-400 font-mono uppercase text-xs block mb-1">
                      La Quiebra del Principio:
                    </strong>
                    <p className="text-stone-300">{currentPillar.industryCase.problem}</p>
                  </div>
                  <div>
                    <strong className="text-lime-400 font-mono uppercase text-xs block mb-1">
                      Medida Correctiva Definitiva:
                    </strong>
                    <p className="text-stone-300">{currentPillar.industryCase.lesson}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {}
      <section id="simulador" className="py-16 border-y border-stone-800 bg-stone-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-orange-950/40 border border-orange-800/50 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5" />
              Laboratorio de Respuesta ante Incidentes
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-100 uppercase tracking-tight">
              Simulador de Impacto en Tiempo Real
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 font-sans mt-1">
              Selecciona una amenaza cibernética activa y despliega contramedidas tácticas para neutralizar el impacto en la Tríada.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Scenarios listing */}
            <div className="lg:col-span-4 space-y-2">
              <div className="text-xs font-mono uppercase text-stone-400 mb-2 px-1">
                Amenazas Detectadas en Red
              </div>
              {INCIDENT_SCENARIOS.map((scen) => {
                const isSelected = scen.id === activeScenario.id;
                return (
                  <button
                    key={scen.id}
                    onClick={() => handleSelectScenario(scen.id)}
                    className={`w-full text-left p-3.5 rounded border transition-all ${
                      isSelected
                        ? 'bg-stone-900 border-amber-500 shadow-md shadow-amber-500/10'
                        : 'bg-stone-950/70 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono uppercase font-bold text-stone-200">
                        {scen.name}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                          scen.severity === 'CRÍTICA'
                            ? 'bg-rose-950/80 border-rose-800 text-rose-300'
                            : 'bg-amber-950/80 border-amber-800 text-amber-300'
                        }`}
                      >
                        {scen.severity}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-400 font-sans line-clamp-2">
                      {scen.trigger}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Tactical Console & Mitigation Panel */}
            <div className="lg:col-span-8 border border-stone-800 rounded-xl bg-stone-950 p-6 flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-800 pb-4 mb-6 gap-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-stone-500">
                      Vector Activo
                    </span>
                    <h3 className="text-xl font-bold text-stone-100 uppercase">
                      {activeScenario.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-400">Pilar Más Vulnerado:</span>
                    <span className="text-xs uppercase font-bold font-mono px-2 py-1 rounded bg-stone-900 border border-stone-700 text-amber-400">
                      {activeScenario.primary}
                    </span>
                  </div>
                </div>

                {/* Console Log readout */}
                <div className="p-3 rounded bg-black/80 border border-stone-800 font-mono text-xs text-amber-400/90 mb-6 flex items-start gap-2">
                  <Terminal className="w-4 h-4 mt-0.5 shrink-0 text-amber-400" />
                  <span>{activeScenario.terminalLog}</span>
                </div>

                {/* Attack Damage Bars vs Mitigated Status */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  {/* Confidencialidad Bar */}
                  <div className="p-3 rounded border border-stone-800 bg-stone-900/50">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-amber-400 font-bold">[C] Confidencialidad</span>
                      <span className="text-stone-400 font-mono">
                        {Math.max(0, activeScenario.impacts.C - Math.round(currentMitigationScore * 0.8))}% Daño
                      </span>
                    </div>
                    <div className="w-full h-2 rounded bg-stone-800 overflow-hidden">
                      <div
                        className="h-full bg-amber-400 transition-all duration-300"
                        style={{
                          width: `${Math.max(0, activeScenario.impacts.C - Math.round(currentMitigationScore * 0.8))}%`
                        }}
                      />
                    </div>
                  </div>

                  {/* Integridad Bar */}
                  <div className="p-3 rounded border border-stone-800 bg-stone-900/50">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-lime-400 font-bold">[I] Integridad</span>
                      <span className="text-stone-400 font-mono">
                        {Math.max(0, activeScenario.impacts.I - Math.round(currentMitigationScore * 0.8))}% Daño
                      </span>
                    </div>
                    <div className="w-full h-2 rounded bg-stone-800 overflow-hidden">
                      <div
                        className="h-full bg-lime-400 transition-all duration-300"
                        style={{
                          width: `${Math.max(0, activeScenario.impacts.I - Math.round(currentMitigationScore * 0.8))}%`
                        }}
                      />
                    </div>
                  </div>

                  {/* Disponibilidad Bar */}
                  <div className="p-3 rounded border border-stone-800 bg-stone-900/50">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-orange-500 font-bold">[A] Disponibilidad</span>
                      <span className="text-stone-400 font-mono">
                        {Math.max(0, activeScenario.impacts.A - Math.round(currentMitigationScore * 0.8))}% Daño
                      </span>
                    </div>
                    <div className="w-full h-2 rounded bg-stone-800 overflow-hidden">
                      <div
                        className="h-full bg-orange-500 transition-all duration-300"
                        style={{
                          width: `${Math.max(0, activeScenario.impacts.A - Math.round(currentMitigationScore * 0.8))}%`
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Mitigations Checkboxes */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-300">
                      Desplegar Controles de Mitigación
                    </span>
                    <span className="text-xs font-mono text-lime-400">
                      Eficacia Aplicada: {currentMitigationScore}%
                    </span>
                  </div>

                  <div className="space-y-2">
                    {activeScenario.mitigations.map((mit) => {
                      const isApplied = appliedMitigations.includes(mit.id);
                      return (
                        <button
                          key={mit.id}
                          onClick={() => toggleMitigation(mit.id)}
                          className={`w-full text-left p-3 rounded border text-xs flex items-center justify-between transition ${
                            isApplied
                              ? 'bg-lime-950/30 border-lime-500/70 text-lime-200'
                              : 'bg-stone-900/80 border-stone-800 text-stone-300 hover:border-stone-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-4 h-4 rounded border flex items-center justify-center ${
                                isApplied
                                  ? 'bg-lime-500 border-lime-400 text-stone-950'
                                  : 'border-stone-700 bg-stone-950'
                              }`}
                            >
                              {isApplied && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span>{mit.label}</span>
                          </div>
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-stone-800 text-stone-300">
                            +{mit.efficiency}% Control
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Status conclusion footer */}
              <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between text-xs">
                <span className="text-stone-400">
                  {currentMitigationScore >= 90
                    ? 'Incidente totalmente contenido. Servicios restablecidos con normalidad.'
                    : currentMitigationScore > 0
                    ? 'Mitigación en curso. Se requiere desplegar contramedidas adicionales.'
                    : 'ALERTA: Amenaza desatada sin contención activa.'}
                </span>
                <button
                  onClick={() => setAppliedMitigations([])}
                  className="px-2 py-1 rounded bg-stone-900 hover:bg-stone-800 text-stone-400 text-[11px] flex items-center gap-1 border border-stone-700"
                >
                  <RotateCcw className="w-3 h-3" /> Reiniciar Simulación
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section id="telemetria" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-widest text-lime-400 mb-1">
            Panel de Conmutación
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-100 uppercase tracking-tight">
            Telemetría de Seguridad Defensiva
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 font-sans mt-1">
            Activa o desactiva defensas institucionales y observa cómo se recalcula al instante la robustez de la Tríada CIA.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Switch 1: MFA */}
          <div
            onClick={() => toggleDefense('mfaHardware')}
            className={`cursor-pointer p-4 rounded-xl border transition-all ${
              defenseToggles.mfaHardware
                ? 'bg-amber-950/20 border-amber-500/60'
                : 'bg-stone-900/40 border-stone-800 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-400 uppercase">[C] MFA FIDO2 Hardware</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${defenseToggles.mfaHardware ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-800 text-stone-400'}`}>
                {defenseToggles.mfaHardware ? 'ACTIVO' : 'APAGADO'}
              </span>
            </div>
            <p className="text-xs text-stone-400 font-sans">
              Obliga a validación física en tokens criptográficos. Previene el 99% de robos de credenciales.
            </p>
          </div>

          {/* Switch 2: Encryption */}
          <div
            onClick={() => toggleDefense('aesEncryption')}
            className={`cursor-pointer p-4 rounded-xl border transition-all ${
              defenseToggles.aesEncryption
                ? 'bg-amber-950/20 border-amber-500/60'
                : 'bg-stone-900/40 border-stone-800 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-400 uppercase">[C] Cifrado AES-256 en Reposo</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${defenseToggles.aesEncryption ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-800 text-stone-400'}`}>
                {defenseToggles.aesEncryption ? 'ACTIVO' : 'APAGADO'}
              </span>
            </div>
            <p className="text-xs text-stone-400 font-sans">
              Almacenamiento cifrado en bases de datos y respaldos. Protege contra robo de soportes magnéticos.
            </p>
          </div>

          {/* Switch 3: Immutable Hashes */}
          <div
            onClick={() => toggleDefense('immutableHashes')}
            className={`cursor-pointer p-4 rounded-xl border transition-all ${
              defenseToggles.immutableHashes
                ? 'bg-lime-950/20 border-lime-500/60'
                : 'bg-stone-900/40 border-stone-800 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-lime-400 uppercase">[I] Hashes Criptográficos SHA-256</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${defenseToggles.immutableHashes ? 'bg-lime-400 text-stone-950 font-bold' : 'bg-stone-800 text-stone-400'}`}>
                {defenseToggles.immutableHashes ? 'ACTIVO' : 'APAGADO'}
              </span>
            </div>
            <p className="text-xs text-stone-400 font-sans">
              Comprobación continua de integridad de archivos y transacciones en bases de datos distribuidas.
            </p>
          </div>

          {/* Switch 4: Audit Logs */}
          <div
            onClick={() => toggleDefense('auditLogs')}
            className={`cursor-pointer p-4 rounded-xl border transition-all ${
              defenseToggles.auditLogs
                ? 'bg-lime-950/20 border-lime-500/60'
                : 'bg-stone-900/40 border-stone-800 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-lime-400 uppercase">[I] Bitácoras WORM Inmutables</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${defenseToggles.auditLogs ? 'bg-lime-400 text-stone-950 font-bold' : 'bg-stone-800 text-stone-400'}`}>
                {defenseToggles.auditLogs ? 'ACTIVO' : 'APAGADO'}
              </span>
            </div>
            <p className="text-xs text-stone-400 font-sans">
              Registro de escritura única imposible de adulterar por intrusos para asegurar trazabilidad pericial.
            </p>
          </div>

          {/* Switch 5: HA Cluster */}
          <div
            onClick={() => toggleDefense('haCluster')}
            className={`cursor-pointer p-4 rounded-xl border transition-all ${
              defenseToggles.haCluster
                ? 'bg-orange-950/20 border-orange-500/60'
                : 'bg-stone-900/40 border-stone-800 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-orange-500 uppercase">[A] Clúster Multi-Región HA</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${defenseToggles.haCluster ? 'bg-orange-500 text-stone-950 font-bold' : 'bg-stone-800 text-stone-400'}`}>
                {defenseToggles.haCluster ? 'ACTIVO' : 'APAGADO'}
              </span>
            </div>
            <p className="text-xs text-stone-400 font-sans">
              Conmutación por error en menos de 5 segundos si cae un centro de datos entero.
            </p>
          </div>

          {/* Switch 6: DDoS Scrubbing */}
          <div
            onClick={() => toggleDefense('ddosScrubbing')}
            className={`cursor-pointer p-4 rounded-xl border transition-all ${
              defenseToggles.ddosScrubbing
                ? 'bg-orange-950/20 border-orange-500/60'
                : 'bg-stone-900/40 border-stone-800 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-orange-500 uppercase">[A] Centro de Filtrado Anti-DDoS</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${defenseToggles.ddosScrubbing ? 'bg-orange-500 text-stone-950 font-bold' : 'bg-stone-800 text-stone-400'}`}>
                {defenseToggles.ddosScrubbing ? 'ACTIVO' : 'APAGADO'}
              </span>
            </div>
            <p className="text-xs text-stone-400 font-sans">
              Inspección en el borde de tráfico masivo para absorber picos anómalos de peticiones maliciosas.
            </p>
          </div>
        </div>
      </section>

      {}
      <section id="evaluacion" className="py-16 border-t border-stone-800 bg-stone-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-stone-900 border border-stone-800 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Validación de Conocimientos
            </div>
            <h2 className="text-3xl font-black text-stone-100 uppercase tracking-tight">
              Examen de Evaluación CIA
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 font-sans mt-1">
              Pon a prueba tus criterios para calificar incidentes y asignar controles pertinentes.
            </p>
          </div>

          <div className="space-y-6">
            {QUIZ_BANK.map((item, qIndex) => {
              const selectedOption = quizAnswers[qIndex];
              const isSelected = selectedOption !== undefined;

              return (
                <div
                  key={qIndex}
                  className="p-6 rounded-xl border border-stone-800 bg-stone-900/50 space-y-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-stone-800 text-amber-400">
                      0{qIndex + 1}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-stone-100 leading-snug">
                      {item.question}
                    </h3>
                  </div>

                  <div className="space-y-2 pt-1 font-sans">
                    {item.options.map((opt, optIndex) => {
                      const isOptionChosen = selectedOption === optIndex;
                      let optionStyle =
                        'border-stone-800 bg-stone-950/70 text-stone-300 hover:border-stone-700';

                      if (isQuizSubmitted) {
                        if (optIndex === item.correct) {
                          optionStyle =
                            'border-lime-500 bg-lime-950/30 text-lime-200 font-medium';
                        } else if (isOptionChosen) {
                          optionStyle =
                            'border-rose-500 bg-rose-950/30 text-rose-200';
                        }
                      } else if (isOptionChosen) {
                        optionStyle =
                          'border-amber-500 bg-amber-950/30 text-amber-200';
                      }

                      return (
                        <button
                          key={optIndex}
                          onClick={() => handleSelectQuizOption(qIndex, optIndex)}
                          className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition flex items-center justify-between ${optionStyle}`}
                        >
                          <span>{opt}</span>
                          {isQuizSubmitted && optIndex === item.correct && (
                            <Check className="w-4 h-4 text-lime-400 shrink-0 ml-2" />
                          )}
                          {isQuizSubmitted && isOptionChosen && optIndex !== item.correct && (
                            <X className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {isQuizSubmitted && (
                    <div className="p-3 rounded bg-stone-950 border border-stone-800 text-xs text-stone-400 font-sans">
                      <strong className="text-stone-200 font-mono">Justificación Técnica: </strong>
                      {item.justification}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Quiz Submit / Reset controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl border border-stone-800 bg-stone-950 gap-4">
              <div>
                {isQuizSubmitted ? (
                  <div className="text-xs">
                    <span className="text-stone-400">Resultado Oficial: </span>
                    <strong
                      className={`font-mono text-sm ${
                        quizScore >= 3 ? 'text-lime-400' : 'text-amber-400'
                      }`}
                    >
                      {quizScore} de {QUIZ_BANK.length} Aciertos (
                      {Math.round((quizScore / QUIZ_BANK.length) * 100)}%)
                    </strong>
                  </div>
                ) : (
                  <div className="text-xs text-stone-400">
                    Preguntas respondidas: {Object.keys(quizAnswers).length} de {QUIZ_BANK.length}
                  </div>
                )}
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                {!isQuizSubmitted ? (
                  <button
                    onClick={() => setIsQuizSubmitted(true)}
                    disabled={Object.keys(quizAnswers).length === 0}
                    className="w-full sm:w-auto px-6 py-2.5 rounded bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Calificar Examen
                  </button>
                ) : (
                  <button
                    onClick={resetQuiz}
                    className="w-full sm:w-auto px-6 py-2.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reintentar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <footer className="border-t border-stone-800/80 py-8 bg-stone-950 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-500" />
            <span className="font-mono text-stone-400">
              TRÍADA CIA • SISTEMA DE CAPACITACIÓN EN CIBERSEGURIDAD
            </span>
          </div>
          <div className="flex items-center gap-4 text-stone-400 font-mono text-[11px]">
            <span className="text-amber-400">C: CONFIDENCIALIDAD</span>
            <span className="text-stone-700">|</span>
            <span className="text-lime-400">I: INTEGRIDAD</span>
            <span className="text-stone-700">|</span>
            <span className="text-orange-500">A: DISPONIBILIDAD</span>
          </div>
        </div>
      </footer>
    </div>
  );
}