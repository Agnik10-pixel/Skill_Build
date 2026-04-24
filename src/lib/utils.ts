import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSkillIcon(title: string): string {
  const t = title.toLowerCase();
  const base = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/';
  
  if (t.includes('python')) return `${base}python/python-original.svg`;
  if (t.includes('java ') || t === 'java masterclass' || t === 'java') return `${base}java/java-original.svg`;
  if (t.includes('javascript')) return `${base}javascript/javascript-original.svg`;
  if (t.includes('c++')) return `${base}cplusplus/cplusplus-original.svg`;
  if (t === 'c programming' || t === 'c') return `${base}c/c-original.svg`;
  if (t.includes('c#')) return `${base}csharp/csharp-original.svg`;
  if (t.includes('ruby')) return `${base}ruby/ruby-original.svg`;
  if (t.includes('go ') || t.includes('golang')) return `${base}go/go-original.svg`;
  if (t.includes('rust')) return `${base}rust/rust-original.svg`;
  if (t.includes('swift')) return `${base}swift/swift-original.svg`;
  if (t.includes('ios') || t.includes('swift')) return `${base}swift/swift-original.svg`;
  if (t.includes('android') || t.includes('kotlin')) return `${base}kotlin/kotlin-original.svg`;
  if (t.includes('ionic')) return `${base}ionic/ionic-original.svg`;
  if (t.includes('spring')) return `${base}spring/spring-original.svg`;
  if (t.includes('laravel')) return `${base}laravel/laravel-original.svg`;
  if (t.includes('symfony')) return `${base}symfony/symfony-original.svg`;
  if (t.includes('c#') || t.includes('dotnet') || t.includes('.net')) return `${base}csharp/csharp-original.svg`;
  if (t.includes('ruby')) return `${base}ruby/ruby-original.svg`;
  if (t.includes('angular')) return `${base}angularjs/angularjs-original.svg`;
  if (t.includes('vue')) return `${base}vuejs/vuejs-original.svg`;
  if (t.includes('svelte')) return `${base}svelte/svelte-original.svg`;
  if (t.includes('next.js')) return `${base}nextjs/nextjs-original.svg`;
  if (t.includes('node')) return `${base}nodejs/nodejs-original.svg`;
  if (t.includes('docker')) return `${base}docker/docker-original.svg`;
  if (t.includes('kubernetes')) return `${base}kubernetes/kubernetes-plain.svg`;
  if (t.includes('terraform')) return `${base}terraform/terraform-original.svg`;
  if (t.includes('ansible')) return `${base}ansible/ansible-original.svg`;
  if (t.includes('aws') || t.includes('amazon')) return `${base}amazonwebservices/amazonwebservices-original-wordmark.svg`;
  if (t.includes('azure')) return `${base}azure/azure-original.svg`;
  if (t.includes('google cloud') || t.includes('gcp')) return `${base}googlecloud/googlecloud-original.svg`;
  if (t.includes('git ') || t === 'git & github') return `${base}git/git-original.svg`;
  if (t.includes('linux')) return `${base}linux/linux-original.svg`;
  if (t.includes('flutter')) return `${base}flutter/flutter-original.svg`;
  if (t.includes('unity')) return `${base}unity/unity-original.svg`;
  if (t.includes('unreal')) return `${base}unrealengine/unrealengine-original.svg`;
  if (t.includes('figma')) return `${base}figma/figma-original.svg`;
  if (t.includes('xd')) return `${base}xd/xd-plain.svg`;
  if (t.includes('html') || t.includes('frontend') || t.includes('full-stack')) return `${base}html5/html5-original.svg`;
  if (t.includes('css')) return `${base}css3/css3-original.svg`;
  if (t.includes('tailwind')) return `${base}tailwindcss/tailwindcss-original.svg`;
  if (t.includes('bootstrap')) return `${base}bootstrap/bootstrap-original.svg`;
  if (t.includes('graphql')) return `${base}graphql/graphql-plain.svg`;
  if (t.includes('spring')) return `${base}spring/spring-original.svg`;
  if (t.includes('django')) return `${base}django/django-plain.svg`;
  if (t.includes('flask')) return `${base}flask/flask-original.svg`;
  if (t.includes('fastapi')) return `${base}fastapi/fastapi-original.svg`;
  if (t.includes('scala')) return `${base}scala/scala-original.svg`;
  if (t.includes('r for data science') || t.includes('r programming')) return `${base}r/r-original.svg`;
  if (t.includes('shell') || t.includes('bash')) return `${base}bash/bash-original.svg`;
  if (t.includes('dart')) return `${base}dart/dart-original.svg`;
  if (t.includes('lua')) return `${base}lua/lua-original.svg`;
  if (t.includes('haskell')) return `${base}haskell/haskell-original.svg`;
  if (t.includes('machine learning') || t.includes('deep learning') || t.includes('ai')) return `${base}tensorflow/tensorflow-original.svg`;
  if (t.includes('cyber') || t.includes('hack')) return `${base}kalilinux/kalilinux-original.svg`;
  if (t.includes('blockchain') || t.includes('solidity')) return `${base}solidity/solidity-original.svg`;
  if (t.includes('ci/cd')) return `${base}githubactions/githubactions-original.svg`;
  if (t.includes('api') || t.includes('postman')) return `${base}postman/postman-original.svg`;
  if (t.includes('firebase')) return `${base}firebase/firebase-plain.svg`;
  if (t.includes('supabase')) return `${base}supabase/supabase-original.svg`;
  if (t.includes('tableau')) return `${base}canva/canva-original.svg`; // Fallback for data viz
  
  // Default fallback (a generic programming icon)
  return `${base}vscode/vscode-original.svg`;
}
