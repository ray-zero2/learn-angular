learn-angular

# Angularメモ
## 基本編
### 初期操作
```:プロジェクト作成
ng g new project-name
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
4. foo.component.spec.ts //テスト用コンポーネントらしい。

htmlとcssは通常のものと同じように記述可能(cssはこのコンポーネントのみに適用される）。
foo.component.tsでhtmlとcssを読み込んで接続する。
```typescript:foo.component.ts
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
```typescript:app.modules.ts
import { FormsModule } from '@angular/forms'; // <--ここにngModelが含まれる

//@ngModule内
imports: [
  FormsModule //これを追記
]


```

### リストなどをfor文で回して表示する
*ngForで生成できる。頭のアスタリスクを忘れないように。
```html:foo.component.html
<ul>
  <li *ngFor="let user of users"> {{ user.name }} </li>
<ul>
```
```typescript:foo.component.ts (example)
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
```html:foo.component.html
<p *ngif="isShow"> Hello World </p>

```

```typescript:foo.component.ts
export class foo implements OnInit {
  isShow: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }
}
```

### イベントバインディング
(例)　クリックイベント

```html:foo.component.html
<p *ngif="isShow"> Hello World </p>
<button (click)="onClick()">click!</button>

```

```typescript:foo.component.ts
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

```html:foo.component.html
<p [class.isSelected = "isSelected"]> Hello World </p>
<button (click)="onClick()">click!</button>

```

```typescript:foo.component.ts
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
