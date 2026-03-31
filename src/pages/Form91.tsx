import { FileText, Save, Send, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Form91() {
  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-400 mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <FileText className="w-5 h-5 text-blue-500/80" />
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground/80 lowercase first-letter:uppercase">Form 91 - Uçuş Bildirimi</h1>
          </div>
          <p className="text-muted-foreground/70 text-sm italic font-light">Operasyonel uçuş raporu ve detaylı bildirim formu.</p>
        </div>
        
        <div className="flex items-center gap-2">
           <Button variant="outline" className="rounded-xl border-none shadow-sm bg-muted/20 hover:bg-muted/30">
              <Save className="w-4 h-4 mr-2" /> Taslağı Kaydet
           </Button>
           <Button className="rounded-xl bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20 border-none transition-all">
              <Send className="w-4 h-4 mr-2" /> Gönder
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm bg-card/40 backdrop-blur-md rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-slate-100/50 bg-slate-50/20">
              <CardTitle className="text-lg font-semibold text-foreground/70 tracking-tight">Temel Bilgiler</CardTitle>
              <CardDescription className="text-xs italic font-light">Uçuşun kimliğini belirleyen ana veriler.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="callsign" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Çağrı Kodu (Callsign)</label>
                  <Input id="callsign" placeholder="THY123..." className="rounded-xl border-none bg-muted/30 focus-visible:ring-1" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="icao" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">ICAO24</label>
                  <Input id="icao" placeholder="4B1234" className="rounded-xl border-none bg-muted/30 focus-visible:ring-1" />
                </div>
              </div>
              <div className="space-y-2">
                  <label htmlFor="origin" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Hareket Noktası</label>
                  <Input id="origin" placeholder="LTFM (İstanbul Havalimanı)" className="rounded-xl border-none bg-muted/30 focus-visible:ring-1" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-card/40 backdrop-blur-md rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-slate-100/50 bg-slate-50/20">
              <CardTitle className="text-lg font-semibold text-foreground/70 tracking-tight">Uçuş Detayları & Açıklamalar</CardTitle>
              <CardDescription className="text-xs italic font-light">Operasyon sırasında karşılaşılan özel durumlar.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-2">
                <label htmlFor="notes" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Rapor Notları</label>
                <Textarea 
                  id="notes" 
                  placeholder="Meteorolojik durum, teknik aksaklıklar veya özel trafik bildirimlerini buraya yazın..." 
                  className="min-h-40 rounded-xl border-none bg-muted/30 focus-visible:ring-1 resize-none"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-blue-50/30 rounded-2xl overflow-hidden border-blue-100/50">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-blue-500">
                <AlertCircle className="w-4 h-4" />
                <CardTitle className="text-sm font-semibold uppercase tracking-tight">Kritik Uyarılar</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-[11px] text-blue-600/70 font-light leading-relaxed italic">
                Form 91 başvuruları, gönderildikten sonra sivil havacılık otoriteleri tarafından denetlenir. Verilen bilgilerin doğruluğu operasyonel güvenlik için kritiktir.
              </p>
            </CardContent>
          </Card>

          <div className="p-6 bg-slate-50/40 rounded-2xl border border-slate-100/50 backdrop-blur-sm space-y-4">
             <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground/50 uppercase tracking-widest">Sistem Durumu</p>
                <p className="text-[10px] text-muted-foreground/60 italic">Form Doğrulama: <span className="text-green-500/80 font-medium">Hazır</span></p>
             </div>
             <div className="h-1.5 w-full bg-slate-200/50 rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 w-3/4 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
             </div>
             <p className="text-[10px] text-muted-foreground/40 italic">Bu form için zorunlu alanların %75'i dolduruldu.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
