//
//  ContentView.swift
//  GitHubTest
//
//  Created by qdpb on 2025/07/03.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundStyle(.tint)
            Text("Hello, world!")
        }
        .padding()
        .frame(width: 100, height: 200)
    }
}

#Preview {
    ContentView()
}
