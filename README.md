<h1 align="center">Bezier Curve Simulator</h1>
<h2 id="description">✨ Description </h2>

Bezier Curve is a smooth curve that is often used in graphic design, animation, and manufacturing. This curve is created by connecting several control points, which determine the shape and direction of the curve. The way to create it is quite simple: by determining the control points and connecting them with the curve. Bezier curves have many real-world applications, such as the pen tool, smooth and realistic animations, creating complex and precise product designs, and making beautiful and unique fonts. The advantage of using Bezier curves is that they are easy to modify and manipulate, allowing for precise designs tailored to specific needs. This program aims to visualize the Bezier curve by using either a brute force or divide-and-conquer algorithm. The user has the option to choose one of these two algorithms to simulate the Bezier curve.

<h2 id="table-of-contents">🔍 Table of Contents</h2>
- <a href="#description">Description</a><br/>
- <a href="#table-of-contents">Table of Contents</a><br/>
- <a href="#tech-stack">Tech Stack</a><br/>
- <a href="#how-to-run">How To Run</a><br/>
- <a href="#usage">Usage</a><br/>
- <a href="#author">Author</a><br/>
- <a href="#note">Additional Note</a>

<h2 id="tech-stack">💻 Tech Stack</h2>

- Go
- Typescript
- Tailwind CSS
- React.js
- Mafs 

<h2 id="how-to-run">🏃 How To Run</h2>

You will need Node.js and npm (or yarn) if you want to run this repository locally. Follow the instructions from this [link](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install all the requirements if you don't have them. You will also need to install the necessary language, i.e. [Go](https://go.dev/doc/install). 
- Clone this project
```
git clone https://github.com/ninoaddict/Tucil1_13522068
```
- Install dependencies for the frontend
```
cd <project_name>/src/frontend
npm install
```
- Run the backend server
```
cd <project_name>/src/backend
go run .
```
- Open another terminal, and run the frontend
```
cd <project_name>/src/frontend
npm start
```
To properly run this project, ensure that the frontend is running at [localhost:3000](http://localhost:3000/) and the backend server is running at [localhost:8080](http://localhost:8080/). Additionally, you can test the algorithms using the provided API endpoints with POST method. The endpoint for the brute force algorithm is accessible at [localhost:8080/bruteforce](http://localhost:8080/bruteforce). As for the divide and conquer algorithm, it's available at [localhost:8080/dnc](http://localhost:8080/dnc). The JSON body for fetching the API endpoints should be in the following format.
 ```
{
    "neff": n,
    "points": [
      {
        x: x1,
        y: y1
      },
      {
        x: x2,
        y: y2
      },
       ...
      {
        x: xn,
        y: yn
      },
    ],
    "iteration": k
}
```  

<h2 id="usage">🐈‍⬛ Usage</h2>

1. Select your input mode
  ![File Input](https://github.com/ninoaddict/Tucil1_13522068/blob/main/public/file_input.png)
  ![Random Input](https://github.com/ninoaddict/Tucil1_13522068/blob/main/public/random_input.png)
2. Upload your .txt file or enter the inputs in the provided entries
  ![Upload File](https://github.com/ninoaddict/Tucil1_13522068/blob/main/public/file_input_filled.png)
  ![Fill Random Input Field](https://github.com/ninoaddict/Tucil1_13522068/blob/main/public/random_input_filled.png)
3. If you select the file input mode, please make sure that your .txt file is in the following format
 ```
buffer_size
matrix_width matrix_height
matrix
number_of_sequences
sequences_1
sequences_1_reward
sequences_2
sequences_2_reward
…
sequences_n
sequences_n_reward
```  
4. Click solve to see the result
  ![Click](https://github.com/ninoaddict/Tucil1_13522068/blob/main/public/random_input_filled.png)
5. You can download the result by clicking the download button
  ![Result](https://github.com/ninoaddict/Tucil1_13522068/blob/main/public/result.png)

<h2 id="author">🤵 Author</h2>
<pre>
  Name  : Adril Putra Merin
  NIM   : 13522068
  Email : <a href="mailto:13522068@std.stei.itb.ac.id">13522068@std.stei.itb.ac.id</a>
</pre>

<h2 id="note">📓 Additional Note</h2>

The algorithm used in this program are located within the specified path.

```
./src/backend/algorithm/
```
