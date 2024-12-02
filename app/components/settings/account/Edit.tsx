"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useClient, UserTypes } from "@/controllers/client/useClient"


type User = UserTypes["user"];
export default function UserSettings() {



  const [activeTab, setActiveTab] = useState("account")

  return (
    <div className="min-h-scree">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-screen flex">
        <div className="w-64 border-r border-neutral-800">
          <TabsList className="flex flex-col items-stretch h-full bg-neutral-900">
            <TabsTrigger value="account" className="justify-start">My Account</TabsTrigger>
            <TabsTrigger value="profile" className="justify-start">Profile</TabsTrigger>
            <TabsTrigger value="privacy" className="justify-start">Privacy</TabsTrigger>
            <TabsTrigger value="notifications" className="justify-start">Notifications</TabsTrigger>
          </TabsList>
        </div>
        <div className="flex-1 overflow-auto p-6">
          <TabsContent value="account">
            <AccountSettings user={user} />
          </TabsContent>
          <TabsContent value="profile">
            <ProfileSettings user={user} />
          </TabsContent>
          <TabsContent value="privacy">
            <PrivacySettings />
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

function AccountSettings({ user }: { user: UserTypes }) {
  return (
    <Card className="bg-neutral-950 text-white">
      <CardHeader>
        <CardTitle>Configuración de la cuenta</CardTitle>
        <CardDescription>Administra la información de tu cuenta</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Nombre</Label>
        </div>
        <div className="space-y-2">
          <Label htmlFor="language">Idioma</Label>
          <Select defaultValue="es">
            <SelectTrigger id="language" className="bg-neutral-800">
              <SelectValue placeholder="Selecciona un idioma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button>Guardar cambios</Button>
      </CardFooter>
    </Card>
  )
}

function ProfileSettings({ user }: { user: UserTypes }) {
  return (
    <Card className="bg-neutral-900">
      <CardHeader>
        <CardTitle>Perfil</CardTitle>
        <CardDescription>Actualiza tu información de perfil</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Nombre de usuario</Label>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Biografía</Label>
          <Input id="bio" placeholder="Cuéntanos sobre ti" className="bg-neutral-800" />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Actualizar perfil</Button>
      </CardFooter>
    </Card>
  )
}

function PrivacySettings() {
  return (
    <Card className="bg-neutral-950">
      <CardHeader>
        <CardTitle>Privacidad y seguridad</CardTitle>
        <CardDescription>Administra tu configuración de privacidad</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="private-profile">Perfil privado</Label>
          <Switch id="private-profile" />
        </div>
        <Separator className="bg-neutral-800" />
        <div className="flex items-center justify-between">
          <Label htmlFor="two-factor">Autenticación de dos factores</Label>
          <Switch id="two-factor" />
        </div>
      </CardContent>
    </Card>
  )
}

function NotificationSettings() {
  return (
    <Card className="bg-neutral-900">
      <CardHeader>
        <CardTitle>Notificaciones</CardTitle>
        <CardDescription>Configura tus preferencias de notificación</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="email-notifications">Notificaciones por correo</Label>
          <Switch id="email-notifications" />
        </div>
        <Separator className="bg-neutral-800" />
        <div className="flex items-center justify-between">
          <Label htmlFor="push-notifications">Notificaciones push</Label>
          <Switch id="push-notifications" />
        </div>
      </CardContent>
    </Card>
  )
}

