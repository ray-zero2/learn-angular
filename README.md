# Angularメモ
## 基本編
### 初期操作
```:プロジェクト作成
ng new project-name
```
```:プロジェクトスタート(4200port)
ng serve --open
```

### コンポーネント生成
以下のコマンドで勝手に生成され、importまで全て行なってくれる。
```
ng g component component-name
```

詳細は以下。(これらは全て自動で行われる。)

コンポーネントはsrc/にコンポーネント名のディレクトリが作られ、その中に生成される。

コンポーネントの中身は
1. foo.component.html
2. foo.component.css
3. foo.component.ts
4. foo.component.spec.ts //テスト用コンポーネントらしい。調査中。

htmlとcssは通常のものと同じように記述可能(cssはこのコンポーネントのみに適用される）。
foo.component.tsでhtmlとcssを読み込んで接続する。
```typescript: foo.component.ts
@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.css']
})

```

このコンポーネントをapp.module.tsでインポートすることで使用。
```typescript:app.module.ts
import { fooComponent } from './foo/foo.component';

//@ngModule内
declarations: [
  AppComponent, //<-AppComponentはルートのコンポーネントとして最初から存在
  fooComponent,
],
```


### 双方向データバインディング書式
ngModelを使うためにapp.modules.tsにFormsModuleをインポートし、
@NgModule()内のimportsに記述する
```html:app.module.html
<p> {{foo.bar}} </p>
<input [(ngModel)]="foo.bar">
```
```TypeScript: app.modules.ts
import { FormsModule } from '@angular/forms'; // <--ここにngModelが含まれる

//@ngModule内
imports: [
  FormsModule //これを追記
]


```

### リストなどをfor文で回して表示する
*ngForで生成できる。頭のアスタリスクを忘れないように。
```html: foo.component.html
<ul>
  <li *ngFor="let user of users"> {{ user.name }} </li>
<ul>
```
```TypeScript: foo.component.ts (example)
interface User {
  name: string;
  age: number;
}

export class foo implements OnInit {
  users: User[] = [
    {name: 'foo', age: 20},
    {name: 'bar', age: 20}
  ];

  constructor() { }

  ngOnInit(): void {
  }
}

```
```html: result.html
<ul>
  <li>foo</li>
  <li>bar</li>
<ul>

```

### 条件で表示非表示を切り替える(v-if的な)
*ngif　で可能。アスタリスクを忘れないように。
```html: foo.component.html
<p *ngif="isShow"> Hello World </p>

```

```TypeScript: foo.component.ts
export class foo implements OnInit {
  isShow: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }
}
```

### イベントバインディング
(例)　クリックイベント

```html: foo.component.html
<p *ngif="isShow"> Hello World </p>
<button (click)="onClick()">click!</button>

```

```TypeScript: foo.component.ts
export class foo implements OnInit {
  isShow: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.isShow = false;
  }
}
```

### クラスバインディング

```html: foo.component.html
<p [class.isSelected = "isSelected"]> Hello World </p>
<button (click)="onClick()">click!</button>

```

```TypeScript: foo.component.ts
export class foo implements OnInit {
  isSelected: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.isSelected = true;
  }
}
```

### 親→子のデータ受け渡し
#### 子コンポーネント
@angular/coreからinputをインポートし、以下の例のように記述。

```html:child.component.html
<!-- 親から渡された値が表示される -->
<p> {{name}} </p>
```

```typescript:child.component.ts
import { Component, OnInit, Input } from '@angular/core'; //Inputを追記

export class child implements OnInit {
  @Input() name: string;

  constructor() { }

  ngOnInit(): void {
  }
}
```


#### 親コンポーネント
``` html:parent.component.html
<app-child [name]="nameData"></app-child>

```
```typescript:parent.component.ts
import { Component, OnInit } from '@angular/core';

export class parent implements OnInit {
  nameData: string = 'fooBar';

  constructor() { }

  ngOnInit(): void {
  }
}
```

### 子→親のデータ受け渡し
調査中


## RxJS
調査中


## Service
コンポーネントでは描画に必要なデータのみを保有させ、通信等の処理はServiceで行う。
以下のコマンドで生成。

```
ng g service foo
```

調査中。


## Routing
### routingのためのmodule生成
```
ng generate module app-routing --flat --module=app
```
--flat :固有ファイルを作らずsrc/app直下にファイルをつくる。
--module=app: 作成したモジュールをAppModuleにimportする。

### Routerのインポートと中身の記述
RouterModule と Routes をインポートする。
```typescript:src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { fooComponent } from './foo/foo.component';
import { barComponent } from './bar/bar.component';

const routes: Routes = [
  //pathに書いてあるページでcomponentが<router-outlet>に表示される
  { path: 'foo', component: fooComponent },
  { path: 'bar', component: barComponent },
  //URLがルート(空文字)と完全一致(pathMatch: full)すれば/barに遷移させる
  { path: '', redirectTo: '/bar', pathMatch: 'full' },
];

@NgModule({
  //import　調査中
  imports: [RouterModule.forRoot(routes)],
  //exportすることでアプリ全体で使用できる
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### RouterOutlet
ルートhtmlに記載することでこの位置にコンポーネントが表示される。
routerLinkは実行されるとルーターが一致するpathに設定される。
```html:src/app/app.component.html
<h1>title</h1>
<nav>
  <a routerLink="/foo">Foo</a>
</nav>
<!-- aタグをクリックするとrouter-outletがFooに置き換わる -->
<router-outlet></router-outlet>
```

#### memo of memo
詳しく調べる内容
1. RouterModule.forRoot(routes)
2. route.snapshot //コンポーネントが作成された直後のルート情報の静的イメージです
3. paramMap //URL から抽出されたルートパラメータ値の辞書です。 "id"キーは、フェッチするヒーローのidを返します by tour of heroes


# Akitaインストールメモ
angularへのインストールメモ
挙動未確認 (2020/4/1現在)

## Akitaインストール
akita本体をインストールする。
使用したいプロジェクトのルートで実行。
```sh:console
$ npm install @datorama/akita
```
## Akita Cliインストール
globalに入れることでどこでも使えるようにする。
```sh:console
$ npm install @datorama/akita-cli -g
```

## Akita実行
### 設定ファイルの追加
使用したいプロジェクトのpackage.jsonに以下を追加。
これを追加することでcli実行時に自動でAngularに最適化される。
```json:pacage.json
  "akitaCli": {
    "customFolderName": "true",
    "template": "angular",
    "basePath": "./src/app"
  }
```

### Akita Cli実行
使用したいプロジェクトのルートでakitaを実行
```sh:console
$ akita
```

```txt:console
>akita

//用途にあった名前を決める。何かしらは入力する必要あり？
Give me a name, please

//StoreかEntityStoreを選択
//Store: key-value構造の状態
//EntityStore: DB風コレクション構造
Which store do you need?

//Http Entity Serviceを使用する場合Yes
//RestApiなどの作成に便利らしい
Use Http Entity Service ?

//フォルダネームを決める。何かしらは入力する必要あり？
Give me a folder name, please counter

//Storeを生成する場所を選択
Choose a directory
```

## ReduxDevTool
ReduxDevToolが使えるようになる。

### akita-ngdevtoolsインストール
使用したいプロジェクトのルートで実行
```sh:console
$ npm i @datorama/akita-ngdevtools --save-dev
```
### プロジェクトでの読み込み
src/app/app.module.tsでインポート
```typescript:app.module.ts
//以下の2つのインポートを追記
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';


@NgModule({
imports: [
  environment.production ? [] : AkitaNgDevtools  //追記
]
```
