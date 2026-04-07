import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, Link } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { motion, AnimatePresence } from 'motion/react';
import { Wand2 as MagicWandIcon, Calendar as CalendarIcon, Video as VideoIcon, MapPin as MapPinIcon, MessageCircle as MessageCircleIcon, Share2 as Share2Icon, Loader2 as Loader2Icon, CheckCircle2 as CheckCircle2Icon, AlertCircle as AlertCircleIcon } from 'lucide-react';

// --- Types ---
interface InvitationData {
  id?: string;
  nome: string;
  data: string;
  slug: string;
  video: string;
  local: string;
  whatsapp: string;
  created_at?: string;
}

// --- Components ---

function Editor() {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [video, setVideo] = useState('');
  const [local, setLocal] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const criarConvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const slug = nome.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    
    try {
      const { error: supabaseError } = await supabase
        .from('convites')
        .insert([{ nome, data, slug, video, local, whatsapp }]);

      if (supabaseError) throw supabaseError;

      const baseUrl = (import.meta as any).env.VITE_APP_URL || 'http://conviteconexoesmagia.com.br';
      const invitationUrl = `${baseUrl}/${slug}`;
      setSuccess(invitationUrl);
      // Reset form
      setNome('');
      setData('');
      setVideo('');
      setLocal('');
      setWhatsapp('');
    } catch (err: any) {
      console.error('Erro ao salvar:', err);
      setError('Erro ao salvar o convite. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-purple-500/30">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-6 shadow-lg shadow-purple-500/20">
            <MagicWandIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
            Convites Conexões Magia
          </h1>
          <p className="text-neutral-400 text-lg">Crie convites digitais encantadores em segundos.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl"
        >
          <form onSubmit={criarConvite} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5 block ml-1">Nome do Anfitrião/Evento</label>
                <input 
                  required
                  placeholder="Ex: Aniversário da Maria" 
                  className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-neutral-600"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)} 
                />
              </div>

              <div className="relative">
                <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5 block ml-1">Data e Hora</label>
                <div className="relative">
                  <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                  <input 
                    required
                    placeholder="Ex: 25 de Dezembro às 19h" 
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-neutral-600"
                    value={data}
                    onChange={(e) => setData(e.target.value)} 
                  />
                </div>
              </div>

              <div className="relative">
                <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5 block ml-1">URL do Vídeo (MP4/Direct Link)</label>
                <div className="relative">
                  <VideoIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                  <input 
                    required
                    placeholder="https://exemplo.com/video.mp4" 
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-neutral-600"
                    value={video}
                    onChange={(e) => setVideo(e.target.value)} 
                  />
                </div>
              </div>

              <div className="relative">
                <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5 block ml-1">Link da Localização (Google Maps)</label>
                <div className="relative">
                  <MapPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                  <input 
                    required
                    placeholder="https://goo.gl/maps/..." 
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-neutral-600"
                    value={local}
                    onChange={(e) => setLocal(e.target.value)} 
                  />
                </div>
              </div>

              <div className="relative">
                <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1.5 block ml-1">WhatsApp para Confirmação</label>
                <div className="relative">
                  <MessageCircleIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                  <input 
                    required
                    placeholder="Ex: 5511999999999" 
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-neutral-600"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)} 
                  />
                </div>
              </div>
            </div>

            <button 
              disabled={loading}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-4 rounded-xl shadow-lg shadow-purple-600/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? <Loader2Icon className="w-5 h-5 animate-spin" /> : <MagicWandIcon className="w-5 h-5" />}
              {loading ? 'Criando...' : 'Criar Convite Mágico'}
            </button>
          </form>

          <AnimatePresence>
            {success && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-8 p-6 bg-green-500/10 border border-green-500/20 rounded-2xl"
              >
                <div className="flex items-center gap-3 text-green-400 mb-4">
                  <CheckCircle2Icon className="w-6 h-6" />
                  <span className="font-semibold text-lg">Convite criado com sucesso!</span>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-neutral-400 text-sm">Compartilhe o link abaixo com seus convidados:</p>
                  
                  <div className="flex items-center gap-2">
                    <input 
                      readOnly
                      value={success}
                      className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-neutral-300 font-mono"
                    />
                    <button 
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(success);
                        alert('Link copiado!');
                      }}
                      className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
                      title="Copiar Link"
                    >
                      <Share2Icon className="w-5 h-5 text-neutral-300" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    <a 
                      href={success}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 border border-purple-500/30 py-3 rounded-xl font-medium transition-all"
                    >
                      <VideoIcon className="w-4 h-4" />
                      Ver Convite
                    </a>
                    
                    <a 
                      href={`https://wa.me/?text=Você foi convidado! Veja os detalhes aqui: ${success}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-500/30 py-3 rounded-xl font-medium transition-all"
                    >
                      <MessageCircleIcon className="w-4 h-4" />
                      Enviar p/ WhatsApp
                    </a>
                  </div>

                  <Link 
                    to={`/${success.split('/').pop()}`}
                    className="text-center text-neutral-500 hover:text-neutral-400 text-xs mt-2 transition-colors"
                  >
                    Abrir nesta aba
                  </Link>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400"
              >
                <AlertCircleIcon className="w-5 h-5" />
                <span className="text-sm font-medium">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

function Invitation() {
  const { slug } = useParams();
  const [data, setData] = useState<InvitationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchInvitation = async () => {
      try {
        const { data: invitation, error: supabaseError } = await supabase
          .from('convites')
          .select('*')
          .eq('slug', slug)
          .single();

        if (supabaseError || !invitation) throw new Error('Not found');
        setData(invitation);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchInvitation();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2Icon className="w-10 h-10 text-purple-500 animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6 text-center">
        <AlertCircleIcon className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Convite não encontrado</h1>
        <p className="text-neutral-400 mb-8">O link que você acessou pode estar incorreto ou o convite foi removido.</p>
        <Link to="/" className="bg-neutral-800 hover:bg-neutral-700 px-6 py-3 rounded-xl transition-colors">
          Voltar para o Início
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col">
      {/* 🎬 VIDEO BACKGROUND/HEADER */}
      <div className="relative w-full aspect-[9/16] md:aspect-video max-h-[70vh] bg-neutral-900 overflow-hidden">
        <video 
          src={data.video} 
          controls 
          autoPlay 
          loop
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
      </div>

      {/* 📄 INFO CONTENT */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 px-8 py-12 -mt-20 relative z-10 bg-black/80 backdrop-blur-lg rounded-t-[3rem] shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.5)]"
      >
        <div className="max-w-xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500"
            >
              {data.nome}
            </motion.h1>
            
            <div className="flex items-center justify-center gap-2 text-purple-400 font-medium text-xl">
              <CalendarIcon className="w-5 h-5" />
              <span>{data.data}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={data.local} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 py-5 rounded-2xl text-lg font-semibold transition-all"
            >
              <MapPinIcon className="w-6 h-6 text-red-500" />
              Ver Localização
            </motion.a>

            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={`https://wa.me/${data.whatsapp}?text=Olá! Confirmo minha presença no convite de ${data.nome}!`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 py-5 rounded-2xl text-lg font-semibold shadow-lg shadow-green-600/20 transition-all"
            >
              <MessageCircleIcon className="w-6 h-6" />
              Confirmar Presença
            </motion.a>
          </div>

          <div className="pt-12 text-center border-t border-neutral-900">
            <p className="text-neutral-600 text-sm uppercase tracking-widest font-medium">
              Criado com Convites Conexões Magia
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Editor />} />
        <Route path="/:slug" element={<Invitation />} />
      </Routes>
    </Router>
  );
}
