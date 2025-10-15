import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Lock, User } from "lucide-react"
import { loginSchema, type LoginForm } from "../types"

interface LoginPageProps {
  onLogin: () => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const [errorMessage, setErrorMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = (data: LoginForm) => {
    if (data.username === "user" && data.password === "password") {
      onLogin()
    } else {
      setErrorMessage("Credenciales inválidas")
    }
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: "url('/images/login-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 drop-shadow-lg">FitChrono</h1>
          <p className="text-sm sm:text-base text-white/90 drop-shadow-md">Tu asistente de entrenamiento</p>
        </div>
        
          <Card className="shadow-xl border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
          <CardHeader className="space-y-1 px-4 sm:px-6">
              <CardTitle className="text-xl sm:text-2xl text-center text-slate-800 dark:text-slate-100">Iniciar Sesión</CardTitle>
              <CardDescription className="text-center text-sm sm:text-base text-slate-600 dark:text-slate-400">
                Ingresa tus credenciales para continuar
              </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Usuario */}
              <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm sm:text-base text-slate-700 dark:text-slate-300">Usuario</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="username"
                    {...register("username")}
                    className="pl-10 h-10 sm:h-11"
                    placeholder="Ingresa tu usuario"
                  />
                </div>
                {errors.username && (
                  <p className="text-xs sm:text-sm text-destructive">{errors.username.message}</p>
                )}
              </div>

              {/* Contraseña */}
              <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm sm:text-base text-slate-700 dark:text-slate-300">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className="pl-10 pr-10 h-10 sm:h-11"
                    placeholder="Ingresa tu contraseña"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-slate-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate-400" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-xs sm:text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>

              {/* Error */}
              {errorMessage && (
                <Alert variant="destructive">
                  <AlertDescription className="text-sm">{errorMessage}</AlertDescription>
                </Alert>
              )}

              {/* Botón */}
              <Button type="submit" className="w-full h-10 sm:h-11" size="lg">
                Entrar
              </Button>
            </form>
            
              <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                <p>Credenciales de prueba:</p>
                <p className="font-mono text-xs sm:text-sm break-all sm:break-normal">Usuario: user | Contraseña: password</p>
              </div>
          </CardContent>
        </Card>
        
          <div className="text-center mt-4 sm:mt-6 text-xs sm:text-sm text-white/70 dark:text-white/60 drop-shadow-md">
            Powered by FitChrono
          </div>
      </div>
    </div>
  )
}
